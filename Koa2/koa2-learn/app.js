const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// redis数据库 session
const session = require('koa-generic-session')
const Redis = require('koa-redis')

// 自定义的中间件
const pv = require('./middleware/koa-pv')

// 连接mongodb数据库
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)
//redis数据库 session
app.keys = ['keys', 'keyaa']
app.use(session({
  //可以把cookie中的存储字段koa.sig 改成 mt.sig
  key:'mt',
  prefix:'mtpr',
  store: new Redis()
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(pv())

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// 连接mongodb数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
