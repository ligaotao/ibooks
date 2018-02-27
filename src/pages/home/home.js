import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import styles from './home.css'
import logo from 'src/assets/img/logo.png'

import Books from 'src/pages/books/books'

import { Switch, Route } from 'react-router-dom';


class Home extends Component {

  state = {
    alertStatus: false, //弹框状态
    alertTip: '1212', //弹框提示文字
  }
  /**
   * 已选择的商品数据
   * @type {Array}
   */
  selectedProList = []; 
  

  render() {
    let self = this

    return (
      <div>
        <NavBar
          mode="light"
          icon={<div><img className={styles.logo} src={logo} /></div>}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />
          ]}
        >
        <ul className={styles['header-tabs']}>
          <li><NavLink  to='/home/books' activeClassName={styles.active} >书城</NavLink></li>
          <li><NavLink  to='/home/my-books' activeClassName={styles.active} >书架</NavLink></li>
        </ul>
        </NavBar>

        <Switch>
          <Route path={`${this.props.match.path}/books`} component={Books} />
          <Route path={`${this.props.match.path}/my-books`} component={Books} />
        </Switch>
        
      </div>
    );
  }
}

export default Home;