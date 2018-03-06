import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import { Switch, Route } from 'react-router-dom';
import List from './compoments/list'
import Books from './compoments/books'

class App extends Component {

  render() {
    return (
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => window.history.back()}
            >分类</NavBar>
            
            <Switch>
            <Route path={`${this.props.match.path}/list`} component={List} />
            <Route path={`${this.props.match.path}/books`} component={Books} />
            </Switch>
        </div>
    );
  }
}

export default App;