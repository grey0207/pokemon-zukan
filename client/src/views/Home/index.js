import React, { Component } from 'react'
import Card from '../../components/Card';
import { getZukanTop } from '../../api';
import './style.css'

class Home extends Component {
  state = {
    zukanTop: null,
    displayNum: 12,
    AllZukanTop: []
  }
  componentDidMount() {
    getZukanTop().then(res => {
      this.setState({
        zukanTop: res.data.slice(0,12),
        AllZukanTop: res.data
      })
    })
  }

  displayIncrease () {
    let newDisplyNum = this.state.displayNum + 12
    this.setState({ displayNum: newDisplyNum }, () => {
      this.setState({ zukanTop: this.state.AllZukanTop.slice(0, this.state.displayNum) })
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
    this.setState({ AllZukanTop: shuffle(this.state.AllZukanTop) }, () => {
      this.setState({ zukanTop: this.state.AllZukanTop.slice(0, 12) })
    })
  }

  render() {
    return (
      <div className="home container">
        <div className="dashboard">
          dashboard
        </div>
        <div className="random-btn">
          <button className="btn btn-lg" onClick={ () => this.randomPokemon() }>Random</button>
        </div>
        <div className="card-list columns">
          { this.state.zukanTop === null
            ? <div>Loading...</div>
            : this.state.zukanTop.map(formData => (
              <div className="column col-6" key={ formData.zukan_no + '_' +  formData.sub_id }>
                <Card formData={ formData } />
              </div>
            ))
          }
        </div>
        <div className="more-btn">
          <button className="btn btn-lg" onClick={ () => this.displayIncrease() }>More</button>
        </div>
      </div>
    )
  }
}

export default Home
