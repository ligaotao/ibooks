import React, { Component } from 'react';

import styles from './index.css'


class Book extends Component {

  state = {
    books: [
      {
        _id: "5816b415b06d1d32157790b1",
        author: "辰东",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F",
        title: "圣墟"
      },
      {
        _id: "5816b415b06d1d32157790b1",
        author: "辰东",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F",
        title: "圣墟"
      },
      {
        _id: "5816b415b06d1d32157790b1",
        author: "辰东",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F",
        title: "圣墟"
      }
    ]
  }

  componentDidMount () {

  }



  render() {

    return (
        <div>
            <ul>
                <li>阅读时长: 999h999m999s</li>
                <li>阅读文字: 9999</li>
            </ul>
            <ul className={styles['book-list']}>
                  {
                    this.state.books.map((k, i) => {
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

export default Book;