const express = require('express')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const sqlite = require('sqlite')

const port = 3005

const app = express()

const dbPromise = sqlite.open(__dirname + '/db/voting-website.sqlite3')
// const dbPromise = sqlite.open('./db/voting-website.sqlite3')
let db

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
  if (req.signedCookies.userid) {
    res.send(`
      <div>
        <span>Welcome,${req.signedCookies.userid}</span>
        <a href="/create.html">创建投票</a>
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
app.post('/create-vote', async (req, res, next) => {
  console.log(req.body)
  var voteInfo = req.body
  var userid = req.signedCookies.userid
  // 如果使用${}的形式，容易被XSS注入，比如 "OR 1=1"
  // 把投票的基本信息插入votes表中
  await db.run(
    'INSERT INTO votes (title, desc, userid, singleSelection, deadline, anonymous) VALUES (?,?,?,?,?,?)',
    voteInfo.title,
    voteInfo.desc,
    userid,
    voteInfo.singleSelection,
    new Date(voteInfo.deadline).getTime(),
    voteInfo.anonymous
  )
  // 倒序查找第一个，也就是正序的最后一个
  // 读取votes表中最新插入的一条数据，获取id，把这个id作为voteid，和投票的选项一起插入到options表中，
  var  vote = await db.get('SELECT * FROM votes ORDER BY id DESC LIMIT 1')
  await Promise.all(voteInfo.options.map(option=>{
    db.run('INSERT INTO options (content, voteid) VALUES (?,?)',option,vote.id)
  }))
  // res.end('投票已创建，编号为' + vote.id)
  res.redirect('/vote/'+vote.id)
})

app.get('/vote/:id', async (req, res, next) => {
  var votePromise = db.get('SELECT * FROM votes WHERE id=?', req.params.id)
  var optionsPromise = db.all('SELECT * FROM options WHERE voteid=?', req.params.id)

  var vote = await votePromise
  var options = await optionsPromise

  res.end(`
    <h1>${vote.title}</h1>
    <h3>${vote.desc}</h3>
    ${
      options.map(option=>{
        return`
          <div data-option-id="${option.id}">
            <span>${option.content}</span>
          </div>
        `
      }).join('  ')
    }
  `)
})

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
  .post(async (req, res, next) => {
    var regInfo = req.body
    if (regInfo.name == '' || regInfo.email == '' || regInfo.password == '') {
      res.end('用户名、邮箱、密码不能为空')
      return
    }
    var user = await db.get('SELECT * FROM users WHERE name=?', regInfo.name)
    if (user) {
      res.end('用户名已被占用')
    } else {
      await db.run(
        'INSERT INTO users (name, email, password) VALUES (?,?,?)',
        regInfo.name,
        regInfo.email,
        regInfo.password
      )
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
        xhr.onload = () => {
          if(xhr.status==200){
            var data = JSON.parse(xhr.responseText)
            // 获取POST请求中返回的code，0表示登录成功，-1表示登录失败
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
        xhr.open('POST','/login')
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        xhr.send('name='+name+'&password='+password)
      }
    </script>
  `)
  })
  .post(async (req, res, next) => {
    var tryLoginUser = req.body
    var user = await db.get(
      'SELECT * FROM users WHERE name=? AND password=?',
      tryLoginUser.name,
      tryLoginUser.password
    )
    if (user) {
      // 设置cookie
      res.cookie('userid', user.id, { signed: true })
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
  .post(async (req, res, next) => {
    var email = req.body.email
    var user = await db.get('SELECT * FROM users WHERE email=?', email)
    if (!user) {
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
    res.end('已向您的邮箱发送密码重置链接，请于20分钟内点击链接修改密码！')
  })

app
  .route('/change-password/:token')
  .get(async (req, res, next) => {
    var token = req.params.token
    var email = changePasswordTokenMap[token]
    if (!email) {
      res.end('链接已失效')
      return
    }
    var user = await db.get('SELECT * FROM users WHERE email=?', email)
    res.end(`
      此页面可以重置${user.name}的密码
      <form action="" method="post">
        <input type="password" name="password"/>
        <button>提交</button>
      </form>
    `)
  })
  .post(async (req, res, next) => {
    var token = req.params.token
    var password = req.body.password
    var email = changePasswordTokenMap[token]
    if (!email) {
      res.end('链接已失效')
    } else {
      delete changePasswordTokenMap[token]
      await db.run('UPDATE users SET password=? WHERE email=?', password, email)
      res.end('密码修改成功')
    }
  })

app.get('/logout', (req, res, next) => {
  res.clearCookie('userid')
  res.redirect('/')
})

dbPromise.then(dbObject => {
  db = dbObject
  app.listen(port, () => {
    console.log('server listening on port', port)
  })
})
