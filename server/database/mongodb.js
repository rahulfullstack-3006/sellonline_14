// const username = "<mongodb username>";
// const password = "<password>";
// const cluster = "<cluster name>";
// const dbname = "myFirstDatabase";

// mongoose.connect(
//   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//   {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
//   }
// );


const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/insurance',{
useNewUrlParser: true,
useUnifiedTopology: true});

const dbMongodb=mongoose.connection;
dbMongodb.on('error',(error)=>{
  console.log("error",error);
})

dbMongodb.once('open',()=>{
  console.log("Database Mongoose Connection Established");
})

module.exports=dbMongodb;