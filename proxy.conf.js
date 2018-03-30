// module.exports = {
//   "/api": {
//     "target": "http://localhost:3000",
//     "secure": false,
//     "pathRewrite": {'^/api' : ''}
//   },
//   "/ws": {
//     "target": "http://localhost:3000",
//     "secure": false,
//     "pathRewrite": {'^/ws' : ''},
//     "ws": true
//   }
// }

module.exports = {
  "/api": {
    "target": "http://146.148.54.191",
    "secure": false
  },
  "/ws": {
    "target": "http://146.148.54.191",
    "secure": false,
    "ws": true
  }
}