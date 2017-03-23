const Promise = require('../../utils/bluebird.js')

var app = getApp()

Page({
  data: {
    boards: [
      { key: 'in_theaters' },
      { key: 'coming_soon1' },
      { key: 'top2501' }
    ]
  },
  onLoad: function() {
    let _this = this;
    let board_promise = this.data.boards.map(board => {
      return app.wxfetch(app.URI + board.key, { data: { count: 6 } }).then(res => {
        board.title = res.data.title
        board.movies = res.data.subjects
        return board
      })
    })
    Promise.all(board_promise).then(boards => {
      _this.setData({ boards: boards })
    })
  }
})
