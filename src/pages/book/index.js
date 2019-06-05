import React, { Component } from 'react';
import { Popover, NavBar, Icon } from 'antd-mobile';
import { addBookHistory, deleteBookHistory, updateBookHisroty } from 'src/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBookText, getChapterText, getAtoc } from 'src/api'
import styles from './index.css'

import { InfiniteScroller } from 'zent'

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

class Book extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    chapters: [], // 章节名称
    content: [],
    source: [], // 书籍的源
    // sourceIndex: 1, // 当前选择的第几个源
    hasMore: true,
    index: 0,
    inHistory: false,
    actionsStatus: false,
    chapterStatus: false,
    timer: 0,
    book: {}
  }

  setStateAsync (state) {
    return new Promise(resolve => this.setState(state, resolve))
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
    let bookReducer = {
      sourceIndex: 0
    }
    booksHistory.some((book) => {
      if (book._id === id) {
        bookReducer = book
        obj = {
          index: book.chapters - 1,
          inHistory: true
        }
      }
      return book._id === id
    })


    this.setState({
      book:Object.assign(state, bookReducer),
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

    let sourceIndex = this.state.book.sourceIndex
    let filters = ['优质书源', '176小说', '小小书屋', '混混小说网', '笔趣阁']
    let sourceArr = source.data
    // .filter(k => !filters.includes(k.name))
    console.log(sourceArr)
    let sourceId = sourceArr[sourceIndex]._id
    try {
      let result = await getBookText({
        bookId: sourceId,
        view: 'chapters'
      })
  
  
      let url = result.data.chapters[index].link
  
      let text = await getChapterText(url)
  
      let content = this.state.content
      content.push({cpContent: text.data.chapter.cpContent})
      await this.setStateAsync({
        chapters: result.data.chapters,
        content,
        index: index + 1,
        source: sourceArr
      })
      this.setChapterScroll(this.state.index)
    } catch (e) {
      console.log(e)
    }

  }

  setChapterScroll (index) {
    var num = 5;
    index = index - num > 0 ? index - num : 0

    var height = 48 * index;
     document.querySelector(`.${styles.chapters} ul`).scroll(0, height)
  }

  async loadMore(closeLoading) {

    const { index, content, chapters, book } = this.state;
    const { actions } = this.props
    const latestList = content;

    let url = chapters[index].link
    // 禁止调用回调函数 防止多次触发
    await this.setStateAsync({
      hasMore: false
    })

    let text = await getChapterText(url)

    const newList = text.data.chapter.cpContent;

    await this.setStateAsync({
      index: index + 1,
      hasMore: true,
      content: [...latestList, { cpContent:newList }]
    });
    // 将章节的位置进行上移一步
    this.setChapterScroll(this.state.index)
    // 将历史更新到store中
    actions.updateBookHisroty({
      ...book,
      chapters: index + 1
    })
    closeLoading && closeLoading();

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

  async goChapters (chapter, i) {
    let self = this

    await self.setStateAsync({
      index: i + 1
    })

    const { content, chapters, book } = this.state;
    const { actions } = this.props
    const latestList = content;

    let url = chapters[i].link

    let text = await getChapterText(url)

    const newList = text.data.chapter.cpContent;


    this.setState({
      content: [...latestList, { cpContent: newList }]
    }, () => {
      window.setTimeout(() => {
        // 调整滚动条位置
        var len = self.state.content.length - 1
        var dom = document.querySelectorAll(`.${styles.txt} pre`)
        var h = 0
        console.log(dom)
        for (let i=0; i<len; i++) {
          h += dom[i].offsetHeight
        }

        // 滚动到最新的一章
        var box = document.querySelector(`.${styles.txt}`)
        box.scroll(0, h);

        self.setState({
          chapterStatus: false
        })
      }, 100)
    });
    // 将历史更新到store中
    actions.updateBookHisroty({
      ...book,
      chapters: i + 1
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

  /**
   *  更改小说的源
   */
  async changeSource (node, sourceIndex) {
    let { source, index, book} = this.state
    let { actions } = this.props
    const sourceId = source[sourceIndex]._id

    let result = await getBookText({
      bookId: sourceId,
      view: 'chapters'
    })

    // 这里应该调用一下跳转到当前章节
    book.sourceIndex = sourceIndex
    await this.setStateAsync({
      book,
      chapters: result.data.chapters,
    })

    // 将历史更新到store中
    actions.updateBookHisroty({
      ...book,
      chapters: index + 1
    })

    this.goChapters(undefined, index)
  }

  render() {
    let self = this
    let { actions } = self.props
    let bodyHeight = document.documentElement.clientHeight;
    let textHeight = bodyHeight - 45 + 'px'


    return (
        <div className={styles['book-box']}>
          <NavBar
          mode="light"
          className={styles['text-header']}
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={
                this.state.source.map((k, i) => {
                  let className = styles.circle
                  let active = this.state.book.sourceIndex === i ? ` ${styles.active}` : ''
                  className += active
                  return (
                    <Item key={i} value={k._id}><i className={className}></i> {k.name}</Item>
                  )
                })
              }
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.changeSource.bind(this)}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
        >
          {(this.state.chapters.length >= this.state.index && this.state.index !== 0 ) ? this.state.chapters[this.state.index - 1].title : '章节名称'}
        </NavBar>
            <div
              style={{height: textHeight }}
              onClick={self.showActions.bind(self)}
            >
              <InfiniteScroller
                className={styles.txt}
                useWindow={false}
                hasMore={this.state.hasMore}
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
