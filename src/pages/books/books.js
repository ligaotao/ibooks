import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './books.css'

import { Carousel, Flex, Toast } from 'antd-mobile';
import { getRankingList } from 'src/api'

class Books extends Component {
  static propTypes = {
    // formData: PropTypes.object.isRequired
  }

  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 0,
    books: []
  }
  
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
    this.orderBooks()
  }

  tips () {
    Toast.info('功能开发中 !!!', 2)
  }

  goClassify (url) {
    this.props.history.push(url)
  }

  async orderBooks () {
    let result = await getRankingList('54d42d92321052167dfb75e3');
    let { books } = result.data.ranking
    this.setState({
      books: books.slice(0, 6)
    })
  }

  render() {
    return (
      <div className={styles.wingblank}>
          <Carousel
            slideWidth = {1}
            autoplay={false}
            infinite
            selectedIndex={1}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                  alt={val}
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>

              <Flex justify="center">
                <div className={styles.icobox} onClick={this.goClassify.bind(this, '/classify/list')}>
                  <img src='/img/ico-1.png' alt='' />
                </div>
                <div className={styles.icobox} onClick={this.goClassify.bind(this, '/rank/list')}>
                  <img src='/img/ico-2.png' alt='' />
                </div>
                <div className={styles.icobox} onClick={this.tips.bind(this)}>
                  <img src='/img/ico-3.png' alt='' />
                </div>
                <div className={styles.icobox} onClick={this.tips.bind(this)}>
                  <img src='/img/ico-4.png' alt='' />
                </div>
              </Flex>
                <h3 className={styles.title}><i></i>推荐小说</h3>
                <ul className={styles['book-list']}>
                  {
                    this.state.books.map((k, i) => {
                      var src = unescape(k.cover)
                      src = src.slice(7, src.length)
                      return (
                        <li>
                          <Link to={`/text/${k._id}`}> <img src={src} alt='' /> </Link>
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

export default Books;