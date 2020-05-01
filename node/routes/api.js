const express = require('express');
const router =express.Router()
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
 mongoose.connect('mongodb://localhost:27017/login-MEAN', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection
  db.on('error',(error)=> console.log(error))
  db.once('open',()=> console.log("connected to db"))

  function verifyToken(req,res,next){
    if(!req.header.authorization){
      return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
      return res.status(401).send('Unauthorized request')
    }
    req.userid =payload.subject
    next()
  }


  router.get('/',(req,res)=>{
      res.send('FRom api route')
  })
  router.get('/special', verifyToken,  (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })
  router.post('/register',(req,res)=>{
      let userData = req.body;
      let user = new User(userData);
      user.save((error,registeredUser)=>{
          if(error){
              console.log(error)
          } else {
            let payload = {subject : registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
              res.status(200).send({token})
          }
      })
  })

  router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload ={subject:user.__v}
          let token = jwt.sign(payload,'secretKey')
          res.status(200).send({token})
        }
      }
    })
  })

  module.exports=router








module.exports=router



