import React, { Component } from 'react'
import Card from '../../components/Card';
import { getZukanTop } from '../../api';
import { types, height, weight, region } from '../../data';
import './style.css'

class Home extends Component {
    state = {
        zukanTop: null,
        filterZukanTop: null,
        _allZukanTop: null,
        _inputValue: null,
        _displayCount: 12,
        _pageIndex:1,
    }

    componentDidMount () {
        getZukanTop()
            .then(res => {
                this.setState({
                    filterZukanTop: res.data,
                    _allZukanTop: res.data,
                })
            })
            .then(() => {
                this.setState({
                    zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex)
                })
            })
    }

    handleChange(e) {
        this.setState({ _inputValue: e.target.value });
    }

    getFilterPokemon () {
        let filterNumberPokemon = this.state._allZukanTop.filter(item => {
            return item.zukan_no.includes(this.state._inputValue);
        });
        this.setState({
            _pageIndex: 1,
            filterZukanTop: filterNumberPokemon,
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex) })
        })
    }

    displayIncrease () {
        this.setState({
            _pageIndex: this.state._pageIndex + 1,
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex) })
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
            _pageIndex: 1,
            filterZukanTop: shuffle(this.state._allZukanTop),
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex) })
        })
    }

    render() {
        let { zukanTop, filterZukanTop } = this.state;
        return (
        <div className="home container">
            <div className="home__search card-list columns col-gapless">
                <div className="column col-11">
                    <div className="has-icon-right">
                        <input type="text" className="home__search-input form-input" placeholder="search pokemon number" onChange={ e => this.handleChange(e) } />
                        <i className="form-icon icon icon-search" onClick={ () => this.getFilterPokemon() }></i>
                    </div>
                </div>
                <div className="column col-1">
                    <i className="home__search-more-btn toggle-dashboard icon icon-more-vert"></i>
                </div>
            </div>
            <div className="home__dashboard">
                <div className="columns home__dashboard-row1">
                    <div className="column col-6 home__dashboard-type">
                        <h5 className="home__dashboard-title">タイプで探す</h5>
                        <div>
                            {
                                types.map((type, index) => <span className={ 'filte-pokemon-type chip ty' + (index + 1) } key={ index }>{ type }</span>)
                            }
                        </div>
                    </div>
                    <div className="column col-6 home__dashboard-figure">
                        <h5 className="home__dashboard-title">高さで探す</h5>
                        <div>
                            {
                                height.map(item => <button className="btn" key={ item }>{ item }</button>)
                            }
                        </div>
                        <h5 className="home__dashboard-title">重さで探す</h5>
                        <div>
                            {
                                weight.map(item => <button className="btn" key={ item }>{ item }</button>)
                            }
                        </div>
                    </div>
                </div>
                <div className="home__dashboard-region">
                    <h5 className="home__dashboard-region__title">地方で探す</h5>
                    {
                        region.map(item => <button className="btn" key={ item.value }>{ item.text }</button>)
                    }
                </div>
                <div className="home__dashboard-bottom">
                    <button className="btn btn-primary reset-btn">Reset</button>
                    <button className="btn btn-primary search-btn">Search</button>
                </div>
            </div>
            {
                zukanTop === null
                ?   <div className="home__content"><img src={ require('../../assets/images/loader.gif') } className="img-responsive loading" alt="loading" /></div>
                :   <div className="home__content">
                        <div className="home__random-btn">
                            <button className="btn btn-lg" onClick={ () => this.randomPokemon() }>Random</button>
                        </div>
                        {
                            zukanTop.length === 0
                            ?   <div className="home__card-list--no-match text-center">no match pokemon</div>
                            :   <div className="home__card-list columns">
                                    {
                                        zukanTop.map(( formData, index ) => (
                                            <div className="column col-6" key={ formData.zukan_no + '_' +  formData.sub_id }>
                                                <Card formData={ formData } />
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                        <div className="home__more-btn">
                            {
                                zukanTop.length === filterZukanTop.length
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
