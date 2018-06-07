import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Chip from '../Chip';
import './style.css'

class MiniCard extends PureComponent {

    render() {
        let { cardData } = this.props;
        return (
            cardData === null
            ?   <div className="card">
                    <div className="card-image">
                        <div className="loading loading-lg"></div>
                    </div>
                </div>
            :   <div className="card mini-card">
                    <Link to={ `/detail/${ cardData.link }` }>
                        <div className="card-image">
                            <img className="img-responsive card-image-pm" src={ `https://www.pokemon.jp${ cardData.img }` } alt={ cardData.name } />
                        </div>
                        <div className="card-header">
                            <div className="card-subtitle text-gray">{ cardData.num }</div>
                            <div className="card-title h6">{ cardData.name }</div>
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

export default MiniCard;
