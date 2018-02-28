import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './utils/rem';
import route from './router'

// import {Provider} from 'react-redux';
// import store from 'src/store/store';

import registerServiceWorker from './registerServiceWorker';


const render = Component => {
    ReactDOM.render(
        <Component />,
        document.getElementById('root')
    )
}

render(route)

registerServiceWorker();
 