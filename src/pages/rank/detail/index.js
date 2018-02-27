import React, { Component } from 'react';

import { Tabs } from 'antd-mobile';
import BookBox from 'src/components/BookBox'

import styles from './styles.css'

import { getRankingList } from 'src/api'

class App extends Component {

    state = {
        tabs: [
            { title: '周榜' },
            { title: '总榜' },
            { title: '月榜' }
        ],
        list: [],
        id: [],
        weekBooks: [],
        totalBooks: [],
        monthBooks: []
    }

    async setRankingList() {
        let { id } = this.props.match.params
        let result = await getRankingList(id)
        let books = result.data.ranking.books

        this.setState({
            weekBooks: books
        })
    }

    componentWillMount() {
        console.log(this.props)
        this.setRankingList()
    }

    render() {
        return (
            <div className={styles.box}>
                <Tabs
                    tabs={this.state.tabs}
                    initialPage={1}
                    swipeable={false}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        <BookBox books={this.state.weekBooks}></BookBox>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        <BookBox books={this.state.totalBooks}></BookBox>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        <BookBox books={this.state.monthBooks}></BookBox>
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default App;