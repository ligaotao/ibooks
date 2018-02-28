import React, { Component } from 'react';
import SexChange from 'src/components/SexChange'

import styles from './style.css'
import { gradientColor } from 'src/utils'

import { Link } from 'react-router-dom';
import { getRanking } from 'src/api'

class App extends Component {

  state = {
    list: [],
    male: [],
    female: [],
    sex: 'male'
  }

  async getRankList () {

    let result = await getRanking()
    let arr = result.data.epub.concat(result.data.picture)

    let male = result.data.male
    let female = result.data.female

    let len = male.length + female.length

    var colors = new gradientColor({
      start: '#fb0d60',
      end: '#0da4fb',
      step: len
    })
    
    var list = colors.getColor()

    female.forEach((k, i) => {
      k.color = list[i]
    })

    male.forEach((k, i) => {
      k.color = list[i + female.length]
    })

    this.setState({
      list: male,
      male,
      female
    })

  }

  sexClick (sex) {
    let list = this.state[sex]
    this.setState({
      sex,
      list
    })
  }

  componentWillMount() {
    this.getRankList()
  }

  render() {
    return (
      <div>
        <SexChange change={this.sexClick.bind(this)} className={styles['rank-sex']}></SexChange>
        <ul className={styles['rank-box']}>
          {
            this.state.list.map((k, i) => {
              return (
                <li key={i}>
                  <i style={{backgroundColor: k.color}} className={styles.border}></i>
                  <Link to={{pathname: '/rank/detail', search: `?id=${k._id}&monthRank=${k.monthRank}&totalRank=${k.totalRank}`}}>{ k.title } </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;