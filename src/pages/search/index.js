import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

class App extends Component {

  render() {
    return (
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => window.history.back()}
            >排行榜</NavBar>

        </div>
    );
  }
}  

export default App;