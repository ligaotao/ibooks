import React, { Component } from 'react';
import styles from './style.css'
import { gradientColor } from 'src/utils'

import { getRanking } from 'src/api'

class App extends Component {

  state = {
    list: []
  }

  async getRankList () {
    var colors = new gradientColor({
      start: '#fb0d60',
      end: '#0da4fb',
      step: 10
    })
    
    var list = colors.getColor()

    this.setState({
      list
    })

    let result = await getRanking()

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
                  <i style={{backgroundColor: k}} className={styles.border}></i>
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