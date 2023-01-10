import React, { Component } from 'react';
import './FetchNewJokes.css';

class FetchNewJokes extends Component {
    constructor(props) {
        super(props);
        this.handleFetchJokes = this.handleFetchJokes.bind(this)
    }

    handleFetchJokes() {
        this.props.fetchJokes();
    }

    render() {
        return (
            <div className="FetchNewJokes">
                <h1 className="FetchNewJokes-title"><span>Dad</span> Jokes</h1>
                <i className="fa-solid fa-face-grin-tears fa-9x"></i>
                <button className="FetchNewJokes-button" onClick={this.handleFetchJokes}>New Jokes</button>
            </div>
        )
    }
}

export default FetchNewJokes;