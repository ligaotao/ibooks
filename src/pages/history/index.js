import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from 'src/store/store'
// import { addPlans } from 'src/actions'
import styles from './index.css'


class Book extends Component {

  constructor(props) {
    super(props);
	}

  componentDidMount () {
    // store.dispatch(addPlans({
    //   id: 2,
    //   value: 'aaa'
    // }));
  }



  render() {
    let { books } = this.props
    return (
        <div>
            <ul>
                <li>阅读时长: 999h999m999s</li>
                <li>阅读文字: 9999</li>
            </ul>
            <ul className={styles['book-list']}>
                  {
                    books.map((k, i) => {
                      var src = unescape(k.cover)
                      src = src.slice(7, src.length)
                      return (
                        <li key={i}>
                          <img src={src} alt='' />
                          <div className={styles['book-name']}>{k.title}</div>
                          <div className={styles['book-author']}>{k.author}</div>
                        </li>
                      )
                    })
                  }
                </ul>
        </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    books: store.reducers.booksHistory
  }
}

export default connect(mapStateToProps)(Book);