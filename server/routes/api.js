const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

const axios = require('axios')
const API = 'https://jsonplaceholder.typicode.com';

const User = require('../models/user')

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/register', (req, res) => {
  const user = new User()

  user.username = req.body.username
  user.password = req.body.password
  
  usernameExists(user.username)
  .then(data => {
    if(!data)
      user.save(function (err) {
        if(err)
          res.status(500).json({status: 'error'});
        else
          res.status(200).json({status: 'ok'});
      });
    else   
      res.status(400).json({status: 'exists'});
      
  })
})

router.post('/login', (req, res) => {
  const user = new User()

  user.username = req.body.username
  user.password = req.body.password
  
  areCredentialsValid(user.username, user.password)
  .then(data => {
    if(data)
      user.save(function (err) {
        if(err)
          res.status(500).json({status: 'error'});
        else
          res.status(200).json({status: 'ok'});
      });
    else   
      res.json({status: 'invalid_creds'});
      
  })
})


router.post('/images', (req, res) => {
  req.body.data.forEach(element => {
    let base64Data = element.url.replace(/^data:image\/[a-z]+;base64,/, "")
 
    const filePath = 'dist/' + req.body.username + '/' + element.title
    ensureDirectoryExistence(filePath)

    require("fs").writeFile(filePath, base64Data, 'base64', function(err) {
      console.log(err);
    });
  });

  res.status(200).json({status: 'ok'});
});


router.get('/images', (req, res) => {
  const dirname = 'dist/' + req.query.username

  if (!fs.existsSync(dirname)) {
    res.status(200).json({data: 'no photo'})
  }

  getDataFromDirectory(dirname)
    .then((data) => { console.log('data::::', data)
                      res.status(200).json({data}); })
    .catch((errMsg) => { console.error(errMsg) })
  
});

function usernameExists(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, function(err, obj) { 
      if(err) reject(err)
      
      if(obj)
        resolve(true)
      else
        resolve(false)
    })
  })
}

function areCredentialsValid(username, password) {
  return new Promise((resolve, reject) => {
    User.findOne({ username, password }, function(err, obj) { 
      if(err) reject(err)
      
      if(obj)
        resolve(true)
      else
        resolve(false)
    })
  })
}

function getDataFromDirectory(dirname) {
  return new Promise((resolve, reject) => {
    const responseArr = []
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        console.error(err);
        reject(err)
        return;
      }
  
      const filesCount = filenames.length
  
      filenames.forEach(function(filename, i) {
        fs.readFile(dirname + '/' + filename, 'base64', function(err, content) {
          if (err) {
            console.error(err);
            return;
          }
          responseArr.push(content)

          if (responseArr.length === filenames.length){
            resolve(responseArr)
          }
        });
      });      
    });
  })
}

  
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

module.exports = router;