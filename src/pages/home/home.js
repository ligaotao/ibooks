import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink  } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import styles from './home.css'
import logo from 'src/assets/img/logo.png'

import Books from 'src/pages/books/books'
import History from "src/pages/history";

import { Switch, Route } from 'react-router-dom';


class Home extends Component {

  state = {
    alertStatus: false, //弹框状态
    alertTip: '1212', //弹框提示文字
    plans: []
  }
  /**
   * 已选择的商品数据
   * @type {Array}
   */
  selectedProList = []; 
  
  search () {
    console.log(1)
    this.props.history.push('/search')
  }

  render() {
    var self =this;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<div><img className={styles.logo} src={logo} alt='' /></div>}
          rightContent={
            <div className={styles.search}>
              <Icon type="search"  />
              <div onClick={self.search.bind(self)} className={styles['search-click']}> </div>
            </div> 
          }
        >
        <ul className={styles['header-tabs']}>
          <li><NavLink  to='/home/books' activeClassName={styles.active} >书城</NavLink></li>
          <li><NavLink  to='/home/history' activeClassName={styles.active} >书架</NavLink></li>
        </ul>
        </NavBar>

        <Switch>
          <Route path={`${this.props.match.path}/books`} component={Books} />
          <Route path={`${this.props.match.path}/history`} component={History} />
        </Switch>
        
      </div>
    );
  }
}


export default Home;