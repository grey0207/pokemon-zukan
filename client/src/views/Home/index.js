import React, { Component } from 'react'
import Card from '../../components/Card';
import { getZukanTop } from '../../api';
import { types, height, weight, region } from '../../data';
import './style.css'

class Home extends Component {
    state = {
        zukanTop: null,
        filterZukanTop: null,
        typesData: null,
        heightData: null,
        weightData: null,
        regionData: null,
        _typeKeyWord: [],
        _heightKeyWord: [],
        _weightKeyWord: [],
        _regionKeyWord: [],
        _allZukanTop: null,
        _inputValue: null,
        _displayCount: 12,
        _pageIndex:1,
        showDashboard: false
    }

    componentDidMount () {
        this._initDashboardData();
        getZukanTop()
            .then(res => {
                res.data.forEach(item => {
                    let zukanNum = parseInt(item.zukan_no, 10);
                    if(zukanNum >= 1 && zukanNum <= 151){
                        item.region = 'kanto'
                      }else if (zukanNum >= 152 && zukanNum <= 251) {
                        item.region = 'jhoto'
                      }else if (zukanNum >= 252 && zukanNum <= 386) {
                        item.region = 'hoenn'
                      }else if (zukanNum >= 387 && zukanNum <= 493) {
                        item.region = 'sinnoh'
                      }else if (zukanNum >= 494 && zukanNum <= 649) {
                        item.region = 'isshu'
                      }else if (zukanNum >= 650 && zukanNum <= 721) {
                        item.region = 'kalos'
                      }else if ( zukanNum >= 722 && zukanNum <= 801) {
                        item.region = 'arolla'
                      }
                })
                return res.data;
            })
            .then(data => {
                this.setState({
                    filterZukanTop: data,
                    _allZukanTop: data,
                })
            })
            .then(() => {
                this.setState({
                    zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex)
                })
            })
    }

    _getFilterPokemonType (type) {
        let filterPokemonType = this.state.filterZukanTop.filter(item => {
            return item.type.includes(type);
        });
        this.setState({
            _pageIndex: 1,
            filterZukanTop: filterPokemonType,
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex) })
        })
    }

    _initDashboardData () {
        let typesData = types.map(item => {
            return {
                name: item,
                isActive: false
            }
        })

        let heightData = height.map(item => {
            return {
                text: item.text,
                value: item.value,
                isActive: false
            }
        })

        let weightData = weight.map(item => {
            return {
                text: item.text,
                value: item.value,
                isActive: false
            }
        })

        let regionData = region.map(item => {
            return {
                text: item.text,
                value: item.value,
                isActive: false
            }
        })

        this.setState({
            typesData,
            heightData,
            weightData,
            regionData
        })
    }

    handleChange(e) {
        this.setState({ _inputValue: e.target.value });
    }

    getFilterPokemonNum () {
        let filterPokemonNum = this.state._allZukanTop.filter(item => {
            return item.zukan_no.includes(this.state._inputValue);
        });
        this.setState({
            _pageIndex: 1,
            filterZukanTop: filterPokemonNum,
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

    reverseNumber () {
        let filterZukanTop = [ ...this.state.filterZukanTop ]
        filterZukanTop.reverse()
        this.setState({
            _pageIndex: 1,
            filterZukanTop: filterZukanTop,
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex) })
        })
    }

    tapSearchMore () {
        this.setState({ showDashboard: !this.state.showDashboard })
    }

    tapTypeButton (i) {
        let { typesData, _typeKeyWord } = this.state;
        let index = _typeKeyWord.indexOf(typesData[i].name);
        let typeKeyWord;
        if(_typeKeyWord.length === 2 && index === -1){
            return
        }
        typesData[i].isActive = !typesData[i].isActive;
        if(typesData[i].isActive === true){
            typeKeyWord = [ ..._typeKeyWord, typesData[i].name ]
        } else {
            _typeKeyWord.splice(index, 1)
            typeKeyWord = _typeKeyWord;
        }

        this.setState({
            typesData: typesData,
            _typeKeyWord: typeKeyWord,
        })
    }

    tapHeightButton(i) {
        let { heightData, _heightKeyWord } = this.state;
        let index = _heightKeyWord.indexOf(heightData[i].value);
        let heightKeyWord;

        heightData[i].isActive = !heightData[i].isActive;
        if(heightData[i].isActive === true){
            heightKeyWord = [ ..._heightKeyWord, heightData[i].value ]
        } else {
            _heightKeyWord.splice(index, 1)
            heightKeyWord = _heightKeyWord;
        }

        this.setState({
            heightData: heightData,
            _heightKeyWord: heightKeyWord,
        })
    }

    tapWeightButton(i) {
        let { weightData, _weightKeyWord } = this.state;
        let index = _weightKeyWord.indexOf(weightData[i].value);
        let weightKeyWord;

        weightData[i].isActive = !weightData[i].isActive;
        if(weightData[i].isActive === true){
            weightKeyWord = [ ..._weightKeyWord, weightData[i].value ]
        } else {
            _weightKeyWord.splice(index, 1)
            weightKeyWord = _weightKeyWord;
        }

        this.setState({
            weightData: weightData,
            _weightKeyWord: weightKeyWord,
        })
    }

    tapRegionButton (i){
        let { regionData, _regionKeyWord } = this.state;
        let index = _regionKeyWord.indexOf(regionData[i].value);
        let regionKeyWord;
        regionData[i].isActive = !regionData[i].isActive;

        if(regionData[i].isActive === true){
            regionKeyWord = [ ..._regionKeyWord, regionData[i].value ]
        } else {
            _regionKeyWord.splice(index, 1)
            regionKeyWord = _regionKeyWord;
        }
        this.setState({
            regionData: regionData,
            _regionKeyWord: regionKeyWord
        })
    }

    tapSearchButton () {
        let { _allZukanTop, _typeKeyWord, _heightKeyWord, _weightKeyWord, _regionKeyWord } = this.state;

        let hasType = item => {
            if (_typeKeyWord.length === 0) {
                return true;
            }
            return _typeKeyWord.length === 2 ? (item.type.includes(_typeKeyWord[0]) && item.type.includes(_typeKeyWord[1])) : item.type.includes(_typeKeyWord[0])
        }

        let hasHeight = item => {
            if (_heightKeyWord.length === 0) {
                return true;
            }
            let takasa;
            if (item.takasa >= 0 && item.takasa < 1.1) {
                takasa = 'low';
            } else if (item.takasa >= 1.1 && item.takasa < 2.1) {
                takasa = 'normal';
            } else if ( item.takasa >= 2.1) {
                takasa = 'high';
            }
            return _heightKeyWord.includes(takasa);
        }

        let hasWeight = item => {
            if (_weightKeyWord.length === 0) {
                return true;
            }
            let omosa;
            if (item.omosa >= 0 && item.omosa < 35.1) {
                omosa = 'light';
            } else if (item.omosa >= 35.1 && item.omosa < 100) {
                omosa = 'normal';
            } else if ( item.omosa >= 100) {
                omosa = 'heavy';
            }
            return _weightKeyWord.includes(omosa);
        }

        let hasRegion = item => {
            if (_regionKeyWord.length === 0) {
                return true;
            }
            return _regionKeyWord.includes(item.region)
        }

        let filterPokemon = _allZukanTop.filter(item => {
            return hasType(item) && hasHeight(item) && hasWeight(item) && hasRegion(item);
        });

        this.setState({
            _pageIndex: 1,
            filterZukanTop: filterPokemon,
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex) })
        })
    }

    tapResetButton () {
        this._initDashboardData();

        this.setState({
            _pageIndex: 1,
            filterZukanTop: this.state._allZukanTop,
            _typeKeyWord: [],
            _heightKeyWord: [],
            _weightKeyWord: [],
            _regionKeyWord: [],
        }, () => {
            this.setState({ zukanTop: this.state.filterZukanTop.slice(0, this.state._displayCount * this.state._pageIndex) })
        })
    }

    render() {
        let { zukanTop, filterZukanTop, typesData, heightData, weightData, regionData, showDashboard } = this.state;
        return (
        <div className="home container">
            <div className="home__search card-list columns col-gapless">
                <div className="column col-11">
                    <div className="has-icon-right">
                        <input type="text" className="home__search-input form-input" placeholder="search pokemon number" onChange={ e => this.handleChange(e) } />
                        <i className="form-icon icon icon-search" onClick={ () => this.getFilterPokemonNum() }></i>
                    </div>
                </div>
                <div className="column col-1">
                    <i className="home__search-more-btn toggle-dashboard icon icon-more-vert" onClick={ () => this.tapSearchMore() }></i>
                </div>
            </div>
            <div className={ "home__dashboard " + (showDashboard ? "home__dashboard--show" : "") }>
                <div className="columns home__dashboard-row1">
                    <div className="column col-6 home__dashboard-type">
                        <h5 className="home__dashboard-title">タイプで探す</h5>
                        <div>
                            {
                                typesData !== null && typesData.map((type, index) => (
                                    <span
                                        className={ "filte-pokemon-type chip ty" + (index + 1) + (type.isActive === true ? " tapped" : "")  }
                                        key={ index }
                                        onClick={ () => this.tapTypeButton(index) }
                                    >
                                        { type.name }
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="column col-6 home__dashboard-figure">
                        <h5 className="home__dashboard-title">高さで探す</h5>
                        <div>
                            {
                                heightData !== null && heightData.map((item, index) => (
                                    <button
                                        className={ "btn" + (item.isActive === true ? " tapped" : "") }
                                        key={ index }
                                        onClick={ () => this.tapHeightButton(index) }
                                    >
                                        { item.text }
                                    </button>
                                ))
                            }
                        </div>
                        <h5 className="home__dashboard-title">重さで探す</h5>
                        <div>
                            {
                                weightData !== null && weightData.map((item, index) => (
                                    <button
                                        className={ "btn" + (item.isActive === true ? " tapped" : "") }
                                        key={ index }
                                        onClick={ () => this.tapWeightButton(index) }
                                    >
                                        { item.text }
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="home__dashboard-region">
                    <h5 className="home__dashboard-region__title">地方で探す</h5>
                    {
                        regionData !== null && regionData.map((item, index) => (
                            <button
                                className={ "btn" + (item.isActive === true ? " tapped" : "") }
                                key={ item.value }
                                onClick={ () => this.tapRegionButton(index) }
                            >
                                { item.text }
                            </button>
                        ))
                    }
                </div>
                <div className="home__dashboard-bottom">
                    <button className="btn btn-primary reset-btn" onClick={ () => this.tapResetButton() }>Reset</button>
                    <button className="btn btn-primary search-btn" onClick={ () => this.tapSearchButton() }>Search</button>
                </div>
            </div>
            {
                zukanTop === null
                ?   <div className="home__content"><img src={ require('../../assets/images/loader.gif') } className="img-responsive loading" alt="loading" /></div>
                :   <div className="home__content">
                        <div className="home__random-btn">
                            <button className="btn btn-lg" onClick={ () => this.randomPokemon() }>Random</button>
                        </div>
                        <div className="home__reverse-btn">
                            <button className="btn btn-lg" onClick={ () => this.reverseNumber() }>Reverse</button>
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
