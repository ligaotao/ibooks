import React, { Component } from 'react';

import { getBookText, getChapterText, getAtoc } from 'src/api'
import styles from './index.css'

import { InfiniteScroller } from 'zent'

class Book extends Component {

  state = {
    chapters: [],
    content: [],
    index: 0,
    actionsStatus: false,
    chapterStatus: false,
    timer: 0
  }

  componentDidMount () {
    let self = this
    setTimeout(() => {
      self.getContent()
    }, 100);
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

    let sourceId = source.data[this.state.index]._id

    let result = await getBookText({
      bookId: sourceId,
      view: 'chapters'
    })

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
    const { index, content, chapters } = this.state;
    const latestList = content;

    let url = chapters[index].link

    let text = await getChapterText(url)

    const newList = text.data.chapter;

    setTimeout(() => {
      this.setState({
        index: index + 1,
        content: [...latestList, newList]
      });
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
      index: i
    }, async () => {
      await self.loadMore()
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

  render() {
    let self = this


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
                  self.state.content.map(k => {
                    return (
                      <pre key={k.id}>{k.cpContent}</pre>
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
                    return (
                      <li key={k.id} onClick={self.goChapters.bind(self, k, i)}>
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
            </div>
        </div>
    );
  }
}

export default Book;