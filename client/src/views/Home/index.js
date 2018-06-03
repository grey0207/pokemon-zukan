import React, { Component } from 'react'
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { getZukanTop } from '../../api';
import { type, height, weight, region } from '../../data';
import './style.css'

class Home extends Component {
    state = {
        zukanTop: null,
        filterZukanTop: [],
	    AllZukanTop: [],
        displayCount: 12,
        pageIndex:1,
    }

    componentDidMount () {
        getZukanTop().then(res => {
            this.setState({
                zukanTop: res.data.slice(0, this.state.displayCount * this.state.pageIndex),
                filterZukanTop: res.data,
                AllZukanTop: res.data
            })
        })
    }

    __getFilterPokemon (e) {
        let filterNumberPokemon = this.state.AllZukanTop.filter(item => {
            return item.zukan_no.includes(e.target.value);
        })
        this.setState({
            filterZukanTop: filterNumberPokemon,
            pageIndex: 1
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state.displayCount * this.state.pageIndex) })
        })
    }

    displayIncrease () {
        let pageIndex = this.state.pageIndex + 1;
        this.setState({ pageIndex: pageIndex }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state.displayCount * this.state.pageIndex) })
        })
    }

    randomPokemon () {
        const shuffle = ([...arr]) => {
            let m = arr.length;
            while (m) {
                const i = Math.floor(Math.random() * m--);
                [arr[m], arr[i]] = [arr[i], arr[m]];
            }
            return arr;
        };
        this.setState({
            filterZukanTop: shuffle(this.state.AllZukanTop),
            pageIndex: 1
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state.displayCount * this.state.pageIndex) })
        })
    }

    onKeyUp (e) {
        e.keyCode === 13 && this.__getFilterPokemon(e);
    }

    render() {
        return (
        <div className="home container">
            <div className="search card-list columns col-gapless">
                <div className="column col-11">
                    <div className="has-icon-right">
                        <input type="text" className="form-input" placeholder="search pokemon number" onKeyUp={ (e) => this.onKeyUp(e) } />
                        <i className="form-icon icon icon-search"></i>
                    </div>
                </div>
                <div className="column col-1">
                    <i className="toggle-dashboard icon icon-more-vert"></i>
                </div>
            </div>

            {
                this.state.zukanTop === null
                ?   <div className="content"><img src={ require('../../assets/images/loader.gif') } className="img-responsive loading" alt="loading" /></div>
                :   <div className="content">
                        <div className="random-btn">
                            <button className="btn btn-lg" onClick={ () => this.randomPokemon() }>Random</button>
                        </div>
                        {
                            this.state.zukanTop.length === 0
                            ?   <div className="no-match text-center">no match pokemon</div>
                            :   <div className="card-list columns">
                                    {
                                        this.state.zukanTop.map(( formData, index ) => (
                                            <div className="column col-6" key={ formData.zukan_no + '_' +  formData.sub_id }>
                                                <Card formData={ formData } />
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                        <div className="more-btn">
                            {
                                this.state.zukanTop.length === this.state.filterZukanTop.length
                                ?   null
                                :   <button className="btn btn-lg" onClick={ () => this.displayIncrease() }>More</button>
                            }

                        </div>
                    </div>
            }
        </div>
        )
    }
}

export default Home
