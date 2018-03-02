import React, { Component } from 'react';
import styles from './styles.css'
import indexStyle from 'src/index.css'

import { NavBar, Icon, Toast } from 'antd-mobile';
import BookBox from 'src/components/BookBox'

import { getKeyWords, getSearchBooks } from 'src/api'


class App extends Component {

  state = {
    value: '',
    keyWords: [],
    books: []
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

  async getBooks () {
    let { keyWords } = this.state
    let self = this
    try {
      let result = await getSearchBooks({query: keyWords})
      self.setState({
        books: result.data.books,
        keyWords: []
      })
    } catch(e) {
      Toast.info('哎呀, 出错了')
    }
  }

  async liClick (key) {
    this.setState({
      value: key
    }, () => {
      this.getBooks()
    })
  }

  render() {
    return (
        <div>
            <NavBar
                className={indexStyle["app-header"]}
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => window.history.back()}
            >
            <input className={styles.search} name='search' value={this.state.value} placeholder='输入书名进行搜索' onChange={this.valueChange.bind(this)} />
            <button className={styles.btn} onClick={this.getBooks.bind(this)}>搜索</button>
            </NavBar>
            <ul className={styles['search-list']}>
              {
                this.state.keyWords.map((k, i) => {
                  return (
                    <li key={i} onClick={this.liClick.bind(this, k)}> {k} </li>
                  )
                })
              }
            </ul>
            <div className={styles.books}>
              <BookBox books={this.state.books} history={this.props.history}></BookBox>
            </div>
        </div>
    );
  }
}  

export default App;