import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter, HashRouter } from 'react-router-dom';
// import asyncComponent from '../utils/asyncComponent';

import home from "../pages/home/home";
import classify from "../pages/classify";
import book from "../pages/book";
import rank from "../pages/rank";

// const record = asyncComponent(() => import("@/pages/record/record"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/home" component={home} />
          <Route path="/classify" component={classify} />
          <Route path="/rank" component={rank} />
          <Route path="/text/:bookId" component={book} />
          <Redirect to="/home/books" />
        </Switch>
      </HashRouter>
    )
  }
}