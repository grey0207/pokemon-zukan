import React, { Component } from 'react'
import { getDetailData } from '../../api';

class Detail extends Component {
    state = {
        detailData: null
    }

    componentDidMount() {
        let { page } = this.props.match.params;
        getDetailData(page)().then(res => {
            this.setState({
                detailData: res.data
            })
        })
    }
    render() {
        return (
            this.state.detailData === null
            ?   <div className="content"><img src={ require('../../assets/images/loader.gif') } className="img-responsive loading" alt="loading" /></div>
            :   <div>{ this.state.detailData.name }</div>
        );
    }
}

export default Detail;