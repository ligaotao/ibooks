import React, { Component } from 'react';
import { addBookHistory, deleteBookHistory, updateBookHisroty } from 'src/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBookText, getChapterText, getAtoc } from 'src/api'
import styles from './index.css'

import { InfiniteScroller } from 'zent'

class Book extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    chapters: [],
    content: [],
    index: 0,
    inHistory: false,
    actionsStatus: false,
    chapterStatus: false,
    timer: 0,
    book: {}
  }

  componentDidMount () {
    let self = this
    let state = this.props.location.state
    let obj = {}
    if (state) {
      window.sessionStorage.bookState = JSON.stringify(state)
    } else {
      state = JSON.parse(window.sessionStorage.bookState) || {}
    }

    // 看当前书 是否在书架中

    let { booksHistory } = this.props
    let id = this.props.match.params.bookId

    booksHistory.some((book) => {
      if (book._id === id) {
        obj = {
          index: book.chapters - 1,
          inHistory: true
        }
      }
      return book._id === id
    })

    this.setState({
      book:state,
      ...obj
    }, () => {
      setTimeout(() => {
        self.getContent()
      }, 100);
    })

  }

  async getContent () {
    const { bookId } = this.props.match.params
    let params = {
      view: 'summary',
      book: bookId
    }
    let {index} = this.state

    // 获取源id
    let source = await getAtoc(params)

    
    let sourceId = source.data[0]._id

    let result = await getBookText({
      bookId: sourceId,
      view: 'chapters'
    })

    console.log(index)

    let url = result.data.chapters[index].link

    let text = await getChapterText(url)

    let content = this.state.content
    content.push(text.data.chapter)
    this.setState({
      chapters: result.data.chapters,
      content,
      index: index + 1
    })
  }

  async loadMore(closeLoading) {
    const { index, content, chapters, book } = this.state;
    const { actions } = this.props
    const latestList = content;

    let url = chapters[index].link

    let text = await getChapterText(url)

    const newList = text.data.chapter;

    setTimeout(() => {
      this.setState({
        index: index + 1,
        content: [...latestList, newList]
      });
      // 将历史更新到store中
      actions.updateBookHisroty({
        ...book,
        chapters: index + 1
      })
      closeLoading && closeLoading();

    }, 100);

  }

  showActions (event) {
    // 点击这里的时候隐藏 章节菜单

    this.setState({
      chapterStatus: false
    })

    // 点击中间的时候展示 功能菜单
    let y = event.nativeEvent.pageY

    let height = document.body.offsetHeight

    if (y < height * 2 / 3 && y > height / 3) {

      if (!this.state.actionsStatus) {
        this.setState({
          actionsStatus: true
        })
  
        clearTimeout(this.state.timer)
        setTimeout(() => {
          this.setState({
            actionsStatus: false
          })
        }, 3000);
      } else {
        clearTimeout(this.state.timer)
        this.setState({
          actionsStatus: false
        })
      }

    }
  }

  showMenu () {
    // 展示章节
    this.setState({
      chapterStatus: true
    })
  }

  goChapters (chapter, i) {
    let self = this
    self.setState({
      index: i + 1
    }, async () => {

      const { index, content, chapters, book } = this.state;
      const { actions } = this.props
      const latestList = content;

      let url = chapters[index].link

      let text = await getChapterText(url)

      const newList = text.data.chapter;

      setTimeout(() => {
        this.setState({
          content: [...latestList, newList]
        });
        // 将历史更新到store中
        actions.updateBookHisroty({
          ...book,
          chapters: index
        })

      }, 100);

      window.setTimeout(() => {
        // 调整滚动条位置
        var len = self.state.content.length - 1
        var dom = document.querySelectorAll(`.${styles.txt} pre`)[len]
        var height = dom.offsetTop

        // 滚动到最新的一章
        var box = document.querySelector(`.${styles.txt}`)
        var top = box.scrollTop;
        box.scroll(0, top + height);

        self.setState({
          chapterStatus: false
        })
      }, 100)
    })
  }

  changeHistory () {
    let { index, book, inHistory } = this.state
    let { actions } = this.props
    if (inHistory) {
      actions.deleteBookHistory(book._id)
    } else {
      actions.addBookHistory({
        ...book,
        chapters: index
      })
    }
    this.setState({
      inHistory: !inHistory
    })
  }

  render() {
    let self = this
    let { actions } = self.props

    return (
        <div className={styles['book-box']}>
            <div 
              onClick={self.showActions.bind(self)}
            >
              <InfiniteScroller
                className={styles.txt}
                useWindow={false}
                loader={
                  <div style={{ textAlign: "center"}}>努力载入中...</div>
                }
                initialLoad={false}
                loadMore={self.loadMore.bind(self)}
              >
                {
                  self.state.content.map((k, i) => {
                    return (
                      <pre key={i}>{k.cpContent}</pre>
                    )
                  })
                }
              </InfiniteScroller>
            </div>
            <div className={`${styles.chapters} ${this.state.chapterStatus ? styles.active: ''}`}>
              <div className={styles.catalog}>目录</div>
              <ul>
                {
                  self.state.chapters.map((k, i) => {
                    let className = i === this.state.index - 1 ? styles.high : ''
                    return (
                      <li key={i} onClick={self.goChapters.bind(self, k, i)} className={className}>
                        {k.title}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className={`${styles.actions} ${this.state.actionsStatus ? styles.active : '' }`}>
              <div onClick={self.showMenu.bind(self)}>
                菜单
              </div>
              <div onClick={self.changeHistory.bind(self)}>
                {self.state.inHistory ? '取消': ''}收藏
              </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    booksHistory: state.reducers.booksHistory
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({addBookHistory, deleteBookHistory, updateBookHisroty}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Book);