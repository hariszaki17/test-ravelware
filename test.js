const moment = require('moment')

let end = moment(new Date())
let start = moment("2020-07-20 09:15")

let duration = moment.duration(end.diff(start))
console.log(Math.floor(duration.asHours()))

console.log(moment(new Date()).format('YYYY-MM-DD hh:mm'))

console.log(new Date('null'))