import React, { Component } from "react";
import './Joke.css'

class Joke extends Component {
    constructor(props) {
        super(props);
        this.handleVoteUp = this.handleVoteUp.bind(this);
        this.handleVoteDown = this.handleVoteDown.bind(this);
    }

    handleVoteUp(e) {
        const value = +e.currentTarget.dataset.value;
        this.props.voteUp(this.props.id, value)
    }

    handleVoteDown(e) {
        const value = +e.currentTarget.dataset.value;
        this.props.voteDown(this.props.id, value);
    }

    getColor() {
        if (this.props.score >= 12) {
            return '#2EF04E'
        } else if (this.props.score >= 9) {
            return '#C9F02E'
        } else if (this.props.score >= 6) {
            return '#EAF02E'
        } else if (this.props.score >= 3) {
            return '#F0C32E'
        } else if (this.props.score >= 0) {
            return '#F0822E'
        } else return '#F0342E'
    }

    getEmoji() {
        if (this.props.score >= 12) {
            return 'fa-solid fa-face-grin-squint-tears fa-2x'
        } else if (this.props.score >= 9) {
            return 'fa-solid fa-face-grin-tears fa-2x'
        } else if (this.props.score >= 6) {
            return 'fa-solid fa-face-laugh-squint fa-2x'
        } else if (this.props.score >= 3) {
            return 'fa-solid fa-face-grin-wide fa-2x'
        } else if (this.props.score >= 0) {
            return 'fa-solid fa-face-smile fa-2x'
        } else return 'fa-solid fa-face-angry fa-2x'
    }

    render() {
        const { joke, score, voteUp, voteDown } = this.props;
        return (
            <div className="Joke">
                <div>
                    <i className="fas fa-arrow-up" data-value="1" onClick={this.handleVoteUp} />
                    <span className="Joke-score" style={{ borderColor: this.getColor() }}>{score}</span>
                    <i className="fas fa-arrow-down" data-value="-1" onClick={this.handleVoteDown} />
                </div>
                <p>{joke}</p>
                <i className={this.getEmoji()} />
            </div>
        )
    }
}

export default Joke;