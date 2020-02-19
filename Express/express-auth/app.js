const express = require('express')
const { User } = require('./models')
const jwt = require('jsonwebtoken')
const assert = require('http-assert')

const app = express()

// 定义token的密钥
const PRIVATEKEY = 'asdasfadqw526eqw'

app.use(express.static(__dirname + '/static')) //处理静态文件请求的中间件
app.use(express.urlencoded({ extended: true })) //用来解析扩展url编码的请求体
app.use(express.json()) //用来解析json请求体

// assert是直接抛出错误，需要错误处理函数。如果不用assert，就不需要这个了
// app.use(async (err, req, res, next) => {
//   res.status(err.statusCode).send({ message: err.message })
// })

app.get('/api/users', async (req, res) => {
  // User.find().then(users => {
  //   res.send(users)
  // })
  const users = await User.find()
  res.send(users)
})

// 注册
app.post('/api/register', async (req, res) => {
  // const user = await User.create(req.body)
  const user = await User.create({
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    title: req.body.title
  })
  res.send({ message: '注册成功' })
})

// 登录
app.post('/api/login', async (req, res) => {
  // 因为定义model时在password字段 写入了select:false,则读取数据库时不会带上password字段
  // .select('+password')，加号代表强制加上这个字段，减号代表排除这个字段，不写+-代表只包含这个字段和_id
  const user = await User.findOne({ username: req.body.username }).select('+password')

  assert(user, 422, '用户不存在')
  // if (!user) {
  //   return res.status(422).send({
  //     message: '用户不存在'
  //   })
  // }

  const isPasswordVaild = require('bcrypt').compareSync(req.body.password, user.password)
  assert(isPasswordVaild, 422, '密码错误')
  // if (!isPasswordVaild) {
  //   return res.status(422).send({
  //     message: '密码错误'
  //   })
  // }

  // 签发token，把该用户的id，以及一些签发时间，过期时间的信息，用私钥加密成明文字符串
  // 前端收到后将token存在localStorage中
  const token = jwt.sign({ id: String(user._id) }, PRIVATEKEY)

  res.send({ user, token })
})

// 验证token，获取用户，中间件
const getUser = async (req, res, next) => {
  // 浏览器提交的token
  const raw = String(req.headers.authorization)
    .split(' ')
    .pop()
  // 解密token
  const { id } = jwt.verify(raw, PRIVATEKEY)
  req.user = await User.findById(id)
  next()
}

app.get('/api/profile', getUser, async (req, res) => {
  res.send(req.user)
})

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
