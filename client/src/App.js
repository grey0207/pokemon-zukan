import React, { Component } from 'react';
import { Container, Grid, Dropdown } from 'semantic-ui-react'
import Cards from './components/Cards'
import Headers from './components/Headers'
import Inputs from './components/Inputs'
import More from './components/More'
import Loading from './components/Loading'
import RandomButton from './components/RandomButton'
import './assets/styles/App.css'


class App extends Component {
  colorS(type) {
    let typeArray = ['ノーマル', 'ほのお', 'みず', 'くさ', 'でんき', 'こおり', 'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし', 'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー'];
    switch (type) {
    case typeArray[0]:
      return 'ty1'
    case typeArray[1]:
      return 'ty2'
    case typeArray[2]:
      return 'ty3'
    case typeArray[3]:
      return 'ty4'
    case typeArray[4]:
      return 'ty5'
    case typeArray[5]:
      return 'ty6'
    case typeArray[6]:
      return 'ty7'
    case typeArray[7]:
      return 'ty8'
    case typeArray[8]:
      return 'ty9'
    case typeArray[9]:
      return 'ty10'
    case typeArray[10]:
      return 'ty11'
    case typeArray[11]:
      return 'ty12'
    case typeArray[12]:
      return 'ty13'
    case typeArray[13]:
      return 'ty14'
    case typeArray[14]:
      return 'ty15'
    case typeArray[15]:
      return 'ty16'
    case typeArray[16]:
      return 'ty17'
    case typeArray[17]:
      return 'ty18'
    default:
      return 'white'
    }
  }
  render() {
    return (
      <div>
        <Headers />
        <Container>
        <Grid padded>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Inputs />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
              </Dropdown>
            </Grid.Column>
          <Grid.Row columns={1}>
            <Grid.Column>
              <RandomButton />
            </Grid.Column>
          </Grid.Row>
          <Cards colorS={this.colorS} />
          </Grid>

          <Loading />
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
              <More />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}


export default App
