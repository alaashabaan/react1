const mongoose = require('mongoose')
// module.exports=()=>{
//     const connectionParams={
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     };

//     // try{
//     //     mongoose.connect(process.env.DB, connectionParams);
//     //     console.log("Connected to DB successfully");
//     // }catch(error){
//     //     console.log(error);
//     //     console.log("Couldn't connect to DB !!");
//     // }
// }

function connect(URI){
 
    mongoose.connect(URI).then(()=>{
        console.log("DB is Connected successfully");
    }).catch(err=>{
        console.log("there is Error");
    });
}

module.exports = connect











