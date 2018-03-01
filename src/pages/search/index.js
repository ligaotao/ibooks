import React, { Component } from 'react';
import styles from './styles.css'

import { NavBar, Icon } from 'antd-mobile';

import { getKeyWords } from 'src/api'


class App extends Component {

  state = {
    value: '',
    keyWords: []
  }

  valueChange (event) {
    let { value } = event.target
    this.setState({
      value
    }, () => {
      console.log(value)
      getKeyWords({query:value}).then(res => {
        if (this.state.value === value) {
          this.setState({
            keyWords: res.data.keywords
          })
        }
      })
    })
  }

  render() {
    return (
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => window.history.back()}
            >
            <input className={styles.search} name='search' value={this.state.value} placeholder='输入书名进行搜索' onChange={this.valueChange.bind(this)} />
            <button>搜索</button>
            </NavBar>
            <ul className={styles['search-list']}>
              {
                this.state.keyWords.map((k, i) => {
                  return (
                    <li key={i}> {k} </li>
                  )
                })
              }
            </ul>
        </div>
    );
  }
}  

export default App;