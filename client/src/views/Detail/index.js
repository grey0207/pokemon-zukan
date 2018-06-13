import React, { Component } from 'react';
import Chip from '../../components/Chip';
import MiniCard from '../../components/MiniCard';
import { Link } from 'react-router-dom';
import { getDetailData } from '../../api';
import './style.css';

class Detail extends Component {
    state = {
        detailData: null,
        page: null
    }

    static getDerivedStateFromProps(props, state) {
        return {page: props.match.params.page}
    }

    componentDidMount() {
        let { page } = this.props.match.params;
        getDetailData(page)().then(res => {
            this.setState({
                detailData: res.data
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.page !== this.state.page){
            this.setState({ detailData: null })
            getDetailData(this.state.page)().then(res => {
                this.setState({ detailData: res.data })
            })
        }
    }

    render() {
        let { detailData } = this.state;
        return (
            <div className="detail container">
                {
                    detailData === null
                    ?   <div className="detail__content">
                            <img src={ require('../../assets/images/loader.gif') } className="img-responsive loading" alt="loading" />
                        </div>
                    :   <div className="detail__content">
                            <div className="detail_content-gotoHome">
                                <Link to="/">
                                    <h1 className="text-center">ポケモンずかん</h1>
                                </Link>
                            </div>
                            <div className="detail__content-title card-list columns col-gapless">
                                <div className="column col-1">
                                    {
                                        detailData.prev === null
                                        ?   ''
                                        :   <Link to={ `/detail/${ detailData.prev }` }>
                                                <i className="icon icon-2x icon-arrow-left"></i>
                                            </Link>
                                    }
                                </div>
                                <div className="column col-10 detail__content-title-text">
                                    <div className="detail__content-title-num text-center">{ detailData.num }</div>
                                    <div className="detail__content-title-name text-center">{ detailData.name }</div>
                                </div>
                                <div className="column col-1">
                                    {
                                        detailData.next === null
                                        ?    ''
                                        :   <Link to={ `/detail/${ detailData.next }` }>
                                                <i className="icon icon-2x icon-arrow-right"></i>
                                            </Link>
                                    }
                                </div>
                            </div>

                            <div className="detail__content-intro card-list columns">
                                <div className="column col-6">
                                    <img src={`https://www.pokemon.jp${detailData.profilePhoto}`} className="img-responsive" alt="profilePhoto"/>
                                </div>
                                <div className="column col-6">
                                    <h6>タイプ</h6>
                                    {
                                        detailData.type.split(',').map(type => <Chip type={type} key={type} />)
                                    }
                                    <h6>弱点<span>※(★)はダメージ4倍</span></h6>
                                    {
                                        detailData.weaknesses.split(',').map(type => <Chip type={type} key={type} />)
                                    }
                                    <p>分類:{ detailData.details[0] }</p>
                                    <p>特性:{ detailData.details[1] }</p>
                                    <p>高さ:{ detailData.details[2] }</p>
                                    <p>重さ:{ detailData.details[3] }</p>
                                    <p>性別:{ detailData.details[4].split(',').map(sexy => <span className="chip" key={ sexy }> { sexy === 'sex-m' ? '♂' : '♀' }</span>) }</p>
                                </div>
                            </div>
                            <div className="detail__content-form">
                                <h3>すがた</h3>
                                <div className="detail__appear">
                                    {
                                        detailData.pokemonForm.length === 0
                                        ?   <h1 className="text-center">なし</h1>
                                        :   <div className="columns">
                                                {
                                                    detailData.pokemonForm.map((item, index) => (
                                                        <div className="column col-xs-6" key={ index }>
                                                            <MiniCard cardData={ item } />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                    }
                                </div>
                                <h3>進 化</h3>
                                <div className="detail__evolution">
                                    {
                                        detailData.evolution.length === 0
                                        ?   <h1 className="text-center">なし</h1>
                                        :   <div className="columns">
                                                {
                                                    detailData.evolution.map((item, index) => (
                                                        <div className="column col-xs-6" key={ index }>
                                                            <MiniCard cardData={ item } />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                    }
                                </div>
                                <h3>進 化 分 岐</h3>
                                <div className="detail__evolution-branch">
                                    {
                                        detailData.evolution_branch.length === 0
                                        ?   <h1 className="text-center">なし</h1>
                                        :   <div className="columns">
                                                {
                                                    detailData.evolution_branch.map((item, index) => (
                                                        <div className="column col-xs-6" key={ index }>
                                                            <MiniCard cardData={ item } />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                    }
                                </div>

                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default Detail;