import React, { Component } from 'react';
import { getPokemonCard } from '../../api';

class Card extends Component {
    constructor(props){
        super(props)
        this.state = { cardData: null }
        this.formData = this.props.formData
    }
    componentDidMount() {
        getPokemonCard({
            data: this.formData
        })
        .then(cardData => this.setState({cardData: cardData}))
    }
    render() {
        return (
            <div className="card">{ this.state.cardData === null ? 'loading' : this.state.cardData.data.pokemon_name }</div>
        );
    }
}

export default Card;