import React, { Component } from 'react';
import styles from './styles.css'
import PropTypes from 'prop-types';

class App extends Component {

    static propTypes = {
        change: PropTypes.func,
        className: PropTypes.string
    }
    
    static defaultProps = {
        className: '',
    };
    
    state = {
        sex: 'male'
    }

    change () {
        this.setState({
            sex: this.state.sex === 'male' ? 'female' : 'male'
        }, () => {
            this.props.change(this.state.sex)
        })
    }

    render() {
        const { className } = this.props
        return (
            <div className={`${styles['change-box']} ${className}`} onClick={this.change.bind(this)}>
                <img src={`/img/${this.state.sex}.png`} />
            </div>
        );
    }
}

export default App;