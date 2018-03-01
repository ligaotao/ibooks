import axios from 'axios'

// const instance = axios.create({
//     baseURL: 'http://api.zhuishushenqi.com/'
// })

export const getClassify = function () {
    return axios.get('/cats/lv2/statistics')
}

export const getLevel2Classify = function () {
    return axios.get('/cats/lv2')
}

export const getBooks = function (params) {
    return axios.get('/book/by-categories', {
        params
    })
}

export const getBookText = function (params) {
    var url = '/atoc'
    if ('bookId' in params) {
        url += '/' + params.bookId
        delete params.bookId
    }
    return axios.get(url, {params})
}

export const getChapterText = function (url) {
    return axios.get(`/chapter/${url}`)
}

// 获取盗版源
export const getAtoc = function (params) {
    return axios.get('/atoc', {params})
}

// 获取排行榜分类

export const getRanking = function () {
    return axios.get('/ranking/gender')
}

// 获取排行Top
export const getRankingList= function (id) {
    return axios.get(`/ranking/${id}`)
}

// 匹配输入关键字
export const getKeyWords = function (params) {
    return axios.get('/book/auto-complete', {params})
}