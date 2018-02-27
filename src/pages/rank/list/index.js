import React, { Component } from 'react';
import styles from './style.css'
import { gradientColor } from 'src/utils'

import { Link } from 'react-router-dom';
import { getRanking } from 'src/api'

class App extends Component {

  state = {
    list: []
  }

  async getRankList () {

    let result = await getRanking()
    let arr = result.data.epub.concat(result.data.picture)
    let len = arr.length

    var colors = new gradientColor({
      start: '#fb0d60',
      end: '#0da4fb',
      step: len
    })
    
    var list = colors.getColor()

    arr.forEach((k, i) => {
      k.color = list[i]
    })

    this.setState({
      list: arr
    })

  }

  componentWillMount() {
    this.getRankList()
  }

  render() {
    return (
      <div>
        <ul className={styles['rank-box']}>
          {
            this.state.list.map((k, i) => {
              return (
                <li key={i}>
                  <i style={{backgroundColor: k.color}} className={styles.border}></i>
                  <Link to={{pathname: '/rank/detail', search: `?id=${k._id}`}}>{ k.title } </Link>
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