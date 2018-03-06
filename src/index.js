import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './utils/rem';
import route from './router'
import registerServiceWorker from './registerServiceWorker';



//我们需要做出两个变化，将 App 组件连接到 Redux
//并且让它能够 dispatch actions 以及从 Redux store 读取到 state。
//在渲染之前将根组件包装进 <Provider>
//这使得我们的 store 能为下面的组件所用

const render = Component => {
    ReactDOM.render(
        <Component />
        ,
        document.getElementById('root')
    )
}

render(route)

registerServiceWorker();
 