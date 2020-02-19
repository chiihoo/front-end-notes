const mongoose = require('mongoose')

// 没有就创建restaurant数据库，有就连接
mongoose.connect('mongodb://localhost:27017/express-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

//定义User模型（表）的结构
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    select:false,
    required: true,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  email: { type: String },
  title: { type: String, required: true }
})

// mongodb中的model模型类似于表，复数形式就是Collections
// Mongoose在创建collection的时候会自动添加s和小写
// 用UserSchema定义User模型，在数据库中会把'User'存为'users'
const User = mongoose.model('User', UserSchema)

// 这句会删除users这个model
// User.db.dropCollection('users')

module.exports = { User }
