import Reac, { Component } from "react";
import Joke from './Joke';
import FetchNewJokes from './FetchNewJokes'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './DadJokes.css'

const API_URL = `https://icanhazdadjoke.com/`;

class DadJokes extends Component {
    static defaultProps = {
        numJokesToFetch: 10
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(localStorage.getItem('DadJokes')) || [],
            loading: false
        }
        this.seenJokes = new Set(this.state.jokes.map(joke => joke.joke))
        this.handleVote = this.handleVote.bind(this);
        this.fetchNewJokes = this.fetchNewJokes.bind(this)

        // this.init();
        this.clearLocalStorage()
    }

    init() {
        const storage = localStorage.getItem('DadJokes');
        if (storage) this.state.jokes = JSON.parse(storage);
    }

    clearLocalStorage() {
        localStorage.clear('DadJokes');
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }

    async getJokes() {
        let jokes = []
        for (let i = jokes.length; i < this.props.numJokesToFetch; i++) {
            const response = await axios.get(API_URL, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            const dadJokes = response.data;
            if (!this.seenJokes.has(dadJokes.joke)) {
                jokes.push({
                    id: uuidv4(),
                    joke: dadJokes.joke,
                    score: 0
                })
            }
        }
        this.setState(curState => ({
            jokes: [...curState.jokes, ...jokes],
            loading: false,
        }))
    }

    componentDidUpdate(prevProp, prevState) {
        // console.log('update is called', prevState, 'current', this.state.jokes)
        // prevState.jokes.map((prevJoke, i) => {
        //     console.log('prev joke', prevJoke, 'current', this.state.jokes[i])
        //     // if (joke.id === )
        // })
        localStorage.setItem('DadJokes', JSON.stringify(this.state.jokes));
    }

    handleVote(id, value) {
        const findJoke = this.state.jokes.map(joke => (joke.id === id) ? { ...joke, score: joke.score + value } : joke);
        // const findJoke = this.state.jokes.map(joke => {
        //     if (joke.id === id) return { ...joke, score: ++joke.score }
        //     return { ...joke }
        // })
        this.setState({ jokes: findJoke });
    }

    fetchNewJokes() {
        this.setState({ loading: true }, () => this.getJokes());
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loading">
                    <i className="fa fa-laugh fa-spin fa-8x"></i>
                    <h1 className="DadJokes-title">Loading...</h1>
                </div >
            )
        }
        this.state.jokes.sort((a, b) => b.score - a.score);
        const jokes = this.state.jokes.map(joke => (
            <Joke key={joke.id} id={joke.id} joke={joke.joke} score={joke.score} voteUp={this.handleVote} voteDown={this.handleVote} />
        ))
        return (
            <div className="DadJokes">
                <section className="DadJokes-left-section">
                    <FetchNewJokes fetchJokes={this.fetchNewJokes} />
                </section>
                <section className="DadJokes-right-section">
                    {jokes}
                </section>
            </div>
        )
    }
}

export default DadJokes;