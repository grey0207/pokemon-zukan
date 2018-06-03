import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Chip from '../Chip';
import axios from 'axios';
import { getPokemonCard } from '../../api';
import './style.css'

class Card extends PureComponent {
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
        this.state.source.cancel('Request canceled');
    }

    render() {
        let { cardData } = this.state
        return (
            cardData === null
            ?   <div className="card">
                    <div className="card-image">
                        <div className="loading loading-lg"></div>
                    </div>
                </div>
            :   <div className="card">
                    <Link to={ `/detail/${ cardData.link }` }>
                        <div className="card-image">
                            <img className="img-responsive card-image-pm" src={ `https://www.pokemon.jp/zukan/images/m/${ cardData.filename }` } alt={ cardData.name } />
                        </div>
                        <div className="card-header">
                            <div className="card-subtitle text-gray">No.{ cardData.zukan_no}</div>
                            <div className="card-title h6">{ cardData.name.split(' ')[0] }</div>
                            <div className="card-subtitle text-gray">{ cardData.name.split(' ')[1] ? cardData.name.split(' ')[1] : '' }</div>
                        </div>
                        <div className="card-body">
                            {
                                cardData.type.split(',').map(type => <Chip type={ type } key={ type } />)
                            }
                        </div>
                    </Link>
                </div>
        );
    }
}

export default Card;
