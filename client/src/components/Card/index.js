import React, { Component } from 'react';
import Chip from '../Chip';
import axios from 'axios';
import { getPokemonCard } from '../../api';
import './style.css'

class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            cardData: null,
            source: axios.CancelToken.source()
        }
    }
    componentDidMount() {
        getPokemonCard({
            data: this.props.formData,
            cancelToken: this.state.source.token
        })
        .then(cardData => this.setState({ cardData: cardData.data }))
    }
    componentWillUnmount() {
        this.state.source.cancel('request cancel');
    }
    render() {
        let cardData = this.state.cardData
        return (
            cardData === null
            ?   <div className="card">
                    <div className="card-image">
                        <img src={ require("../../assets/images/loader.gif") } alt="loading" className="img-responsive" style={{ margin: '0 auto' }} />
                    </div>
                </div>
            :   <div className="card">
                    <div className="card-image">
                        <img src={ `https://www.pokemon.jp/zukan/images/m/${ cardData.filename }` } alt={ cardData.name } className="img-responsive"/>
                    </div>
                    <div className="card-header">
                        <div className="card-subtitle text-gray">No.{ cardData.zukan_no}</div>
                        <div className="card-title h6">{ cardData.name.split(' ')[0] }</div>
                        <div className="card-subtitle text-gray">{ cardData.name.split(' ')[1] ? cardData.name.split(' ')[1] : '' }</div>
                    </div>
                    <div className="card-body">
                        {
                            cardData.type.split(',').map(type =>
                                <Chip type={ type } key={ type } />
                            )
                        }
                    </div>
                </div>
        );
    }
}

export default Card;