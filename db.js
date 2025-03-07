const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/account')
.then(
    ()=>{
      console.log('MongoDB Connected...');
    }
)
.catch(
    (err)=>{
      console.log('Connection Error :', err);
      process.exit(1);
    }
)
module.exports=mongoose;


