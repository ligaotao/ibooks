import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import store from 'src/store/store'
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
            <ul className={styles['book-list']}>
                  {
                    books.map((k, i) => {
                      return (
                        <li key={i}>
                          <Link to={{pathname: `/text/${k._id}`, state: k}}>
                            <img src={k.img} alt='' />
                          </Link>
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