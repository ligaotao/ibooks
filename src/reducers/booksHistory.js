import { ADD_BOOK_HISTORY } from 'src/actions/action-type'

const initialState = [
    {
        _id: "5816b415b06d1d32157790b1",
        author: "辰东",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F",
        title: "圣墟",
        chapters: 0,
        positions: 0
    },
    {
        _id: "5816b415b06d1d32157790b1",
        author: "辰东",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F",
        title: "圣墟",
        chapters: 0,
        positions: 0
    },
    {
        _id: "5816b415b06d1d32157790b1",
        author: "辰东",
        cover: "/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F",
        title: "圣墟",
        chapters: 0,
        positions: 0
    }
]

export default function books (state = initialState, action) {
    switch (action.type) {
        case ADD_BOOK_HISTORY:
            console.log(action)
            return [
                ...state,
                action.content
            ]
        default:
            return state
    }
}
