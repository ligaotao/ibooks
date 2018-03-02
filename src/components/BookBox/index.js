import React, { Component } from 'react';
import styles from './styles.css'
import PropTypes from 'prop-types';

class App extends Component {

    static propTypes = {
        books: PropTypes.array
    }

    static defaultProps = {
        books:　[]
    }

    goBook (id) {
        console.log(id)
        this.props.history.push(`/text/${id}`)
    }

    render() {
        var self = this
        return (
            <div>
                {
                this.props.books.map(k => {
                    var src = unescape(k.cover)
                    src = src.slice(7, src.length)
                    return (
                    <div key={k._id} className={styles.box} onClick={self.goBook.bind(self, k._id)}>
                        <img src={src} alt='' />
                        <div className={styles.content}>
                        <h3 className={styles.title}>{k.title}</h3>
                        <h3 className={styles.author}>{k.author}</h3>
                        <p className={styles.meta}>
                            {k.shortIntro}
                        </p>
                        </div>
                    </div>
                    )
                })
                }
            </div>
        );
    }
}

export default App;