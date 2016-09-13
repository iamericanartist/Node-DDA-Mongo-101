"use strict"

const { MongoClient: { connect } } = require('mongodb')

const { argv: [,, ...filter] } = process

const MONGODB_URL = "mongodb://localhost:27017/test"      // abstracted to a variable for easier use later

const name = RegExp(`^${filter.join(" ")}`, "i")          // sets name up as a search method with RegEx
const borough = RegExp(`^${filter.join(" ")}`, "i")       // sets name up as a search method with RegEx


connect(MONGODB_URL)
  .then(db => {
  db.collection("restaurants")
    // .find()                      //a cursor - NOT the data we're looking for // find() is the async action
    .find({ name })                 //regEx search terms
    .sort({ name: 1 })


// // toArray METHOD  wait til all gets returned
  //   .toArray()
  //   .then((data) => {
  //     data.forEach(restaurant => {
  //       if (restaurant.name) {
  //         console.log("restaurant", restaurant.name)
  //       }
  //     })
  //   })
  //   .then(() => db.close())
  // })
  //   .catch(console.error)


// forEach METHOD  can use as they come down
    .forEach(restaurant => {
      if (restaurant.name) {
      console.log("Ristorante", restaurant.cuisine)    //promise
      }
    }, () => db.close())
  })
  .catch(console.error)
