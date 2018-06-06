import React, { PureComponent } from 'react';
import { types } from '../../data';
import './style.css';

let colorType = type => {
    switch (type) {
      case types[0]:
        return 'ty1'
      case types[1]:
        return 'ty2'
      case types[2]:
        return 'ty3'
      case types[3]:
        return 'ty4'
      case types[4]:
        return 'ty5'
      case types[5]:
        return 'ty6'
      case types[6]:
        return 'ty7'
      case types[7]:
        return 'ty8'
      case types[8]:
        return 'ty9'
      case types[9]:
        return 'ty10'
      case types[10]:
        return 'ty11'
      case types[11]:
        return 'ty12'
      case types[12]:
        return 'ty13'
      case types[13]:
        return 'ty14'
      case types[14]:
        return 'ty15'
      case types[15]:
        return 'ty16'
      case types[16]:
        return 'ty17'
      case types[17]:
        return 'ty18'
      default:
        return 'white'
    }
}

class Chip extends PureComponent {
    render() {
        let { type } = this.props;
        return (
            <span className={ 'pokemon-type chip ' + colorType(type) }>{ type }</span>
        );
    }
}

export default Chip;