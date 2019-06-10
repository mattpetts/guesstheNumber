import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
    constructor () {
        super();
        this.state = {
            lives: '',
            currentNumber: '',
            currentGuess: '',
            level: '',
            levelInverted: '',
            maxGuess: 10,
            status: '',
            users: [],
            currentDate: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.leaderSubmit = this.leaderSubmit.bind(this);
    }

    //Handle the datacapture
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
          currentGuess: e.target.value
        });
    }

    //Handle form submit
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
          currentGuess: this.state.number,
        });
        if (this.state.currentGuess == this.state.currentNumber) {
            this.setState({
                status: 'You win - the number has been reset',
                level: this.state.level + 1,
                maxGuess: this.state.maxGuess + 5,
                lives: this.state.lives + 2,
                levelInverted: this.state.levelInverted - 1,
            })
            this.generateNumber(this.state.maxGuess);
        }else{
            this.setState({
                status: 'Incorrect, Guess Again',
                lives: this.state.lives - 1
            })
        }
        if (this.state.lives < 1){
            this.setState({
                lives: 0,
                status: 'Game Over'
            })
            document.getElementById('userForm').style.display = 'none';
            document.getElementById('leaderForm').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }
    }

    //Handle leadervboard submit
    leaderSubmit(e) {
        e.preventDefault();
        let date = new Date();
        let dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

        const usersRef = firebase.database().ref('users');
        const user = {
          name: this.state.username,
          level: this.state.level,
          date: dateString,
          levelInverted: this.state.levelInverted,
        }
        usersRef.push(user);
        this.setState({
            username: '',
            date: ''
        });

        document.getElementById('leaderForm').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
      }

    //generate a random number
    generateNumber (maxGuess) {
        let genNumber = Math.floor(Math.random() * maxGuess) + 1  ;
        let string = genNumber.toString()

        this.setState({
            currentNumber: string
        });
    }

    //Start the game - set beginning states
    componentDidMount() {
        this.setState({
            lives: 10,
            level: 1,
            levelInverted: -1
        })
        this.generateNumber(this.state.maxGuess);

        //Get leadervoard info from firebase
        const usersRef = firebase.database().ref('users').orderByChild('levelInverted').limitToLast(10);
        usersRef.on('value', (snapshot) => {
            let newState = [];
            snapshot.forEach(userSnapshot => {
                let user = userSnapshot.val();
                newState.push({
                  id: user,
                  name: user.name,
                  level: user.level,
                  date:  user.date
                });
            });
            this.setState({
                users: newState
            });


        });
    }

    render() {
        return(
            <div className="appWrapper">
                <div className="overlay" id="overlay"></div>
                <div className="wrapper">
                    <h1>I'm thinking of a number between <br /> 1 and {this.state.maxGuess}. Guess The Number</h1>
                    <form onSubmit={this.handleSubmit} id="userForm" method="POST">
                        <input type="number" name="number" id="userInput" placeholder="Guess Here" onChange={this.handleChange} value={this.state.number} />
                        <input type="submit" value="SUBMIT GUESS" />
                    </form>
                    <div className="feedback">
                        <div>
                            <h3>Lives</h3>
                            <p>You have {this.state.lives} lives left</p>
                        </div>
                        <div>
                            <h3>Level</h3>
                            <p>You are on level {this.state.level}</p>
                        </div>
                    </div>
                    {this.state.status ? <div className="status"><h3>{this.state.status}</h3></div> : ''}
                    <div className="leaderboardWrapper">
                        <h2>Guess the number leaderboard</h2>
                        <ul>
                            {this.state.users.map((user) => {
                                return (
                                <li key={user.id}>
                                    <h3>{user.name} made it to level {user.level}</h3>
                                    <p>On {user.date}</p>
                                </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div id="leaderForm">
                        <h2>You made it to level {this.state.level}. Add your score to the leaderboard</h2>
                        <form onSubmit={this.leaderSubmit} method="POST">
                            <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
                            <input type="submit" value="SUBMIT" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;