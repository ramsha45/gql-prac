const app = require('./app')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {useNewUrlParser: true}).then((con) => {
  console.log("mongoDB CONNECTED")
}).catch((error)=>{
  console.log(error)
});

app.listen(3001, () => {
  console.log('server is listening on 3001')
})