import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import { Switch, Route } from 'react-router-dom';
import List from './list'

class App extends Component {

  render() {
    return (
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => window.history.back()}
            >排行榜</NavBar>
            
            <Switch>
            <Route path={`${this.props.match.path}/list`} component={List} />
            </Switch>
        </div>
    );
  }
}

export default App;