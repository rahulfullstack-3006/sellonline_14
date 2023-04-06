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
// const Country=require('country-state-city').Country;
// const State=require('country-state-city').State;
// const City=require('country-state-city').City;

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


/***************To insert country data in mongo db start*******************/
// const Country = require('country-state-city').Country;
// const CountryModel=require('../models/countryModel');
// const countries = Country.getAllCountries();

// // Create an array of documents to insert
// const documentsCountry = countries.map(country => {
//   return {
//     name: country.name,
//     short_name: country.isoCode
//   };
// });

// // Define an array of operations to perform
// const operationsCountry = documentsCountry.map(document => {
//     return {
//       insertOne: {
//         document: document
//       }
//     };
//   });

// // Perform the bulk operation
// CountryModel.bulkWrite(operationsCountry)
// .then(result => {
//   console.log('Bulk operation completed successfully:', result);
// })
// .catch(error => {
//   console.error('Bulk operation failed:', error);
// });

/***************To insert country data in mongo db end*******************/


/***************To insert state data in mongo db start*******************/
// const State = require('country-state-city').State;
// const StateModel=require('../models/statesModel');
// const states = State.getAllStates();

// // Create an array of documents to insert
// const documentsState = states.map(state => {
//   return {
//     name: state.name,
//     country_short_name: state.countryCode
//   };
// });

// // Define an array of operations to perform
// const operationsState = documentsState.map(document => {
//     return {
//       insertOne: {
//         document: document
//       }
//     };
//   });

// // Perform the bulk operation
// StateModel.bulkWrite(operationsState)
// .then(result => {
//   console.log('Bulk operation completed successfully:', result);
// })
// .catch(error => {
//   console.error('Bulk operation failed:', error);
// });

/**************To insert state data in mongo db end*********************/

/***************To insert city data in mongo db start*******************/
// const City=require('country-state-city').City;
// const CityModel=require('../models/cityModel');
// const cities=City.getAllCities();
// const documentsCity = cities.map(city => {
//     return {
//       name: city.name,
//       state_name: city.stateCode
//     };
//   });

// const operationsCity = documentsCity.map(document => {
//     return {
//       insertOne: {
//         document: document
//       }
//     };
//   });

//   CityModel.bulkWrite(operationsCity)
//   .then(result => {
//     console.log('Bulk operation completed successfully:', result);
//   })
//   .catch(error => {
//     console.error('Bulk operation failed:', error);
//   });

/***************To insert city data in mongo db end*******************/



module.exports=dbMongodb;