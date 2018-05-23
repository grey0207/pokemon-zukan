import React, { Component } from 'react'
import Card from '../../components/Card';
import { getZukanTop } from '../../api';

class Home extends Component {
  state = {
    zukanTop: null
  }
  componentDidMount() {
    getZukanTop().then(res => {
      this.setState({zukanTop: res.data.slice(0,12)})
    })
  }
  renderCard() {
    if(this.state.zukanTop === null){
      return (
        <div>Loading...</div>
      )
    }
    else{
      return (
      this.state.zukanTop.map(formData => (
          <Card formData={ formData } />
      ))
      )
    }
  }
  render() {
    return (
      <div>
        Home
        <div className="dashboard">
          dashboard
        </div>
        <div className="card-list">
        { this.renderCard() }
        </div>
      </div>
    )
  }
}

export default Home
