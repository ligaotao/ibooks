import React, { Component } from 'react';
import styles from './list.css'

import { getClassify, getLevel2Classify } from 'src/api'

class App extends Component {

  state = {
    list: {}
  }

  getClassifyList = async function () {
    let result = await getClassify()
    let level2 = await getLevel2Classify()

    result.data.male.forEach((element, i) => {
      element.mins = level2.data.male[i].mins
    });

    result.data.female.forEach((element, i) => {
      element.mins = level2.data.female[i].mins
    });

    let list = {
      男生: result.data.male,
      女生: result.data.female
    }

    this.setState({list})
    console.log(this.state)
  }

  goDetail (books) {
    window.sessionStorage.booksClassify = JSON.stringify(books)
    this.props.history.push('/classify/books')
  }

  componentWillMount () {
    this.getClassifyList()
  }

  render() {
    return (
        <div>
          {
            Object.keys(this.state.list).map((k) => {
              return  <div className={styles.box} key={k}>
                    <h3 className={styles.title}><i></i> {k}</h3> 
                    <ul className={styles['class-list']}>
                        {
                          this.state.list[k].map((kk) => {
                            return <li key={kk.name} onClick={this.goDetail.bind(this, kk)} > {kk.name} <br /> <span className={styles.count}>{kk.bookCount}</span></li>
                          })
                        }
                    </ul>               
                </div>
            })
          }
        </div>
    );
  }
}

export default App;