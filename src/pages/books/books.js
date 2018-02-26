import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './books.css'

import { Carousel, WingBlank, Flex } from 'antd-mobile';

class Books extends Component {
  static propTypes = {
    // formData: PropTypes.object.isRequired
  }

  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 0,
  }
  
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }

  goClassify (url) {
    this.props.history.push(url)
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
                  alt=""
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
                  <img src='/img/ico-1.png' />
                </div>
                <div className={styles.icobox} onClick={this.goClassify.bind(this, '/rank/list')}>
                  <img src='/img/ico-2.png' />
                </div>
                <div className={styles.icobox}>
                  <img src='/img/ico-3.png' />
                </div>
                <div className={styles.icobox}>
                  <img src='/img/ico-4.png' />
                </div>
              </Flex>
                <h3 className={styles.title}><i></i>推荐小说</h3>
                <ul className={styles['book-list']}>
                  <li>
                    <img src={require('src/assets/img/ico1.png')}/>
                    <div className={styles['book-name']}>书名</div>
                    <div className={styles['book-author']}>作者名</div>
                  </li>
                  <li>
                    <img />
                    <div>书名</div>
                    <div>作者名</div>
                  </li>
                  <li>
                    <img />
                    <div>书名</div>
                    <div>作者名</div>
                  </li>
                  <li>
                    <img />
                    <div>书名</div>
                    <div>作者名</div>
                  </li>
                </ul>
      </div>
    );
  }
}

export default Books;