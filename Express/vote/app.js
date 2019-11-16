const express = require('express')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const sqlite = require('sqlite')

const port = 3005

const app = express()

// const dbPromise = sqlite.open(__dirname+'/db/voting-website.sqlite3')
// const dbPromise = sqlite.open('./db/voting-website.sqlite3')
// let db

const users = [
  {
    name: 'a',
    email: 'a@qq.com',
    password: 'a'
  },
  {
    name: 'b',
    email: 'b@qq.com',
    password: 'b'
  },
  {
    name: 'yy',
    email: 'yyflying11d@163.com',
    password: 'y'
  }
]

const changePasswordTokenMap = {}

app.use((req, res, next) => {
  res.set('Content-Type', 'text/html; charset=UTF-8')
  next()
})
// 可以设置cookie签名密码
app.use(cookieParser('my secret'))
// 处理静态文件
app.use(express.static(__dirname + '/static'))
// 用URL编码的有效负载解析传入的请求
app.use(
  express.urlencoded({
    extended: true
  })
)

app.get('/', (req, res, next) => {
  console.log(req.cookies)
  console.log(req.signedCookies)
  if (req.signedCookies.user) {
    res.send(`
      <div>
        <span>Welcome,${req.signedCookies.user}</span>
        <a href="/create">创建投票</a>
        <a href="/logout">登出</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <a href="/register">注册</a>
        <a href="/login">登录</a>
      </div>
    `)
  }
})
app.get('/create', (req, res, next) => {})
app.get('/vote/:id', (req, res, next) => {})
app
  .route('/register')
  .get((req, res, next) => {
    res.send(`
    <form action="/register" method="post">
      用户名：<input type="text" name="name">
      邮箱：<input type="text" name="email">
      密码：<input type="password" name="password">
      <button>注册</button>
    </form>
  `)
  })
  .post((req, res, next) => {
    var userInfo = req.body
    if (users.findIndex(it => it.name === userInfo.name) >= 0) {
      res.end('用户名已被占用')
    } else {
      users.push(userInfo)
      res.end('注册成功')
    }
  })

app
  .route('/login')
  .get((req, res, next) => {
    res.send(`
    <form id="loginForm" action="/login" method="post">
      用户名：<input type="text" name="name">
      密码：<input type="password" name="password">
      <a href="/forgot">忘记密码</a>
      <button>登录</button>
    </form>

    <script>
      loginForm.onsubmit = e=>{
        e.preventDefault()
        var name = document.querySelector('[name="name"]').value
        var password = document.querySelector('[name="password"]').value
        // 用ajax请求在当前页面验证用户名密码是否正确
        var xhr = new XMLHttpRequest()
        xhr.open('POST','/login')
        xhr.onload = () => {
          if(xhr.status==200){
            var data = JSON.parse(xhr.responseText)
            if(data.code==0){
              alert('login success, will redirected to homepage')
              location.href = '/'
            }else{
              alert('login failed')
            }
          }else{
            alert('服务器错误')
          }
        }
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        xhr.send('name='+name+'&password='+password)
      }
    </script>
  `)
  })
  .post((req, res, next) => {
    var tryLoginUser = req.body
    if (
      users.findIndex(
        it => it.name === tryLoginUser.name && it.password === tryLoginUser.password
      ) >= 0
    ) {
      // 设置cookie
      res.cookie('user', tryLoginUser.name, { signed: true })

      res.json({ code: 0 })
      return

      // res.end(`
      //   登陆成功，<span id="countDown"></span>秒后将跳转至首页
      //   <script>
      //     var remain=3
      //     countDown.textContent= remain
      //     var timer = setInterval(()=>{
      //       countDown.textContent = --remain
      //       if(remain==0){
      //         clearInterval(timer)
      //       }
      //     },1000)
      //     setTimeout(()=>{
      //       location.href ='/'
      //     },3000)
      //   </script>
      // `)
      // res.redirect('/')
    } else {
      res.json({ code: -1 })
      // res.end('用户名或密码错误')
    }
  })

app
  .route('/forgot')
  .get((req, res, next) => {
    res.end(`
    <form action="/forgot" method="post">
      请输入您的邮箱：
      <input type="text" name="email" />
      <button>确定</button>
    </form>
  `)
  })
  .post((req, res, next) => {
    var email = req.body.email
    if (!users.find(it => it.email == email)) {
      res.end('未找到此用户邮箱!')
      return
    }
    var token = Math.random()
      .toString()
      .slice(2)
    changePasswordTokenMap[token] = email

    setTimeout(() => {
      delete changePasswordTokenMap[token]
    }, 60 * 1000 * 20)

    var link = `http://localhost:3005/change-password/${token}`

    console.log(link)

    // nodemailer发送邮件验证

    // var transporter = nodemailer.createTransport({
    //   service: 'qq',
    //   port: 465, // SMTP 端口
    //   secureConnection: true, // 使用 SSL
    //   auth: {
    //     user: '627955739@qq.com',
    //     // smtp授权码
    //     pass: 'jpuowpbfsoujbbhf'
    //   }
    // })
    // // setup e-mail data with unicode symbols
    // var mailOptions = {
    //   from: '"阳亚" <627955739@qq.com>', // 发件地址
    //   // to: 'yyflying11d@163.com', // 收件列表
    //   to: email, // 收件列表
    //   subject: 'Hello, Yang', // 标题
    //   //text和html两者只支持一种
    //   // text: 'Hello world ?', //文本内容
    //   html: `<b>Hello world ?${link}</b>` // html内容
    // }
    // // send mail with defined transport object
    // transporter.sendMail(mailOptions, function(error, info) {
    //   if (error) {
    //     return console.log(error)
    //   }
    //   console.log('Message sent: ' + info.response)
    // })

    res.end('已向您的邮箱发送密码重置链接')
  })

app
  .route('/change-password/:token')
  .get((req, res, next) => {
    var token = req.params.token
    var user = users.find(it => it.email == changePasswordTokenMap[token])
    res.end(`
      此页面可以重置${user.name}的密码
      <form action="" method="post">
        <input type="password" name="password"/>
        <button>提交</button>
      </form>
    `)
  })
  .post((req, res, next) => {
    var token = req.params.token
    var user = users.find(it => it.email == changePasswordTokenMap[token])
    var password = req.body.password
    if (user) {
      user.password = password
      delete changePasswordTokenMap[token]
      res.end('密码修改成功')
    } else {
      res.end('此链接已失效')
    }
  })

app.get('/logout', (req, res, next) => {
  res.clearCookie('user')
  res.redirect('/')
})

// dbPromise.then(dbObject => {
//   db = dbObject
//   app.listen(port, () => {
//     console.log('server listening on port', port)
//   })
// })
app.listen(port, () => {
  console.log('server listening on port', port)
})
