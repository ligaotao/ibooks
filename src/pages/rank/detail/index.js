import React, { Component } from 'react';

import { Tabs } from 'antd-mobile';
import BookBox from 'src/components/BookBox'

import styles from './styles.css'

import { getRankingList } from 'src/api'
import { urlQuery } from 'src/utils'

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
        let { id, totalRank, monthRank } = urlQuery(this.props.location.search);

        let arr = [id, totalRank, monthRank]

        let result = await getRankingList(id)
        let books = result.data.ranking.books

        this.setState({
            weekBooks: books,
            id: arr
        })
    }

    async tabChange (tab, index) {
        var key = ['weekBooks', 'totalBooks', 'monthBooks']

        if (this.state[key[index]].length === 0) {
            let result = await getRankingList(this.state.id[index])
            let books = result.data.ranking.books

            this.setState({
                [key[index]]: books
            })
        }
        console.log(index)
    }

    componentWillMount() {
        this.setRankingList()
    }

    render() {
        return (
            <div className={styles.box}>
                <Tabs
                    tabs={this.state.tabs}
                    initialPage={0
                    }
                    swipeable={false}
                    onChange={this.tabChange.bind(this)}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        <BookBox books={this.state.weekBooks} history={this.props.history}></BookBox>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        <BookBox books={this.state.totalBooks} history={this.props.history}></BookBox>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        <BookBox books={this.state.monthBooks} history={this.props.history}></BookBox>
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default App;