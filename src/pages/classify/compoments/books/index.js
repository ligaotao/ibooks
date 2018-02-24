import React, { Component } from 'react';
import styles from './list.css'

import { getClassify, getLevel2Classify, getBooks } from 'src/api'

class App extends Component {

  state = {
    classifys: [],
    classify: '',
    types: [],
    type: '',
    books: [],
    major: ''
  }

  getBooks = async function (obj = {}) {
    console.log(this.state)
    let params = Object.assign({
      major: this.state.major,
      type: this.state.type,
      minor: this.state.classify
    }, obj)
    console.log(params)
    let result = await getBooks(params)
    this.setState({books: result.data.books})
  }

  componentWillMount () {
    var booksClassify = JSON.parse(window.sessionStorage.booksClassify);
    var list = booksClassify.mins;
    list = list.map(k => {
      return {
        value: k,
        name: k
      }
    })
    list = [{value: '', name: '全部'}].concat(list)
    var types = [{value: '', name: '全部'},
        {value: 'hot', name: '热门'},
        {value: 'new', name: '新书'},
        // {value: 'repulation', name: '好评'},
        {value: 'over', name: '完结'},
        {value: 'month', name: '包月'}
    ]
    this.setState({classifys: list, types, major: booksClassify.name})

    this.getBooks({major: booksClassify.name, limit: 6, start: 0})

  }

  setClassify (value) {
    this.setState({classify: value}, () => {this.getBooks()})
  }

  setType (value) {
    this.setState({type: value}, () => {this.getBooks()})
  }

  goBook (id) {
    this.props.history.push(`/text/${id}`)
  }

  render() {
    let self = this;
    return (
        <div>
          <ul className={styles.classifys}>
            {
              this.state.classifys.map(k => {
                var name = k.value === this.state.classify ? styles.active : ''
                return (
                  <li key={k.value} className={name} onClick={this.setClassify.bind(this, k.value)}>{k.name}</li>
                )
              })
            }
          </ul>
          <ul className={styles.classifys}>
            {
              this.state.types.map(k => {
                var name = k.value === this.state.type ? styles.active : ''
                return (
                  <li key={k.value} className={name} onClick={this.setType.bind(this, k.value)}>{k.name}</li>
                )
              })
            }
          </ul>
          <div>
            {
              this.state.books.map(k => {
                var src = unescape(k.cover)
                src = src.slice(7, src.length)
                return (
                  <div key={k._id} className={styles.box} onClick={self.goBook.bind(self, k._id)}>
                    <img src={src} />
                    <div className={styles.content}>
                      <h3 className={styles.title}>{k.title}</h3>
                      <h3 className={styles.author}>{k.author}</h3>
                      <p className={styles.meta}>
                        {k.shortIntro}
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
    );
  }
}

export default App;