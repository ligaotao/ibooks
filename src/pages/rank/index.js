import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import { Switch, Route } from 'react-router-dom';
import List from './list'
import Detail from './detail'

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
            <Route path={`${this.props.match.path}/detail`} component={Detail} />
            </Switch>
        </div>
    );
  }
}  

export default App;