const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

const axios = require('axios')
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/posts', (req, res) => {
    // Get posts from the mock api
    // This should ideally be replaced with a service that connects to MongoDB
    axios.get(`${API}/posts`)
      .then(posts => {
        res.status(200).json(posts.data);
      })
      .catch(error => {
        res.status(500).send(error)
      });
});



router.post('/images', (req, res) => {
  console.log('heeeeeeeeeeeeeeeeeeeere')
  //console.log('on server::', req.body.username, req.body.data)

  req.body.data.forEach(element => {
    let base64Data = element.url.replace(/^data:image\/[a-z]+;base64,/, "")
 
    const filePath = 'dist/' + req.body.username + '/' + element.title
    console.log('filePath::', filePath)
    console.log('base64Data::::', base64Data)
    ensureDirectoryExistence(filePath)

    require("fs").writeFile(filePath, base64Data, 'base64', function(err) {
      console.log(err);
    });
  });

  res.status(200).json({status: 'ok'});
});


router.get('/images', (req, res) => {
  console.log('heeeeeeeeeeeeeeeeeeeere images', req.query.username)

 /* const url = require('url');
  const url_parts = url.parse(request.url, true);
  const query = url_parts.query;*/

  const dirname = 'dist/' + req.query.username

  if (!fs.existsSync(dirname)) {
    res.status(200).json({data: 'no photo'})
  }

  getDataFromDirectory(dirname)
    .then((data) => { console.log('data::::', data)
                      res.status(200).json({data}); })
    .catch((errMsg) => { console.error(errMsg) })
  
});


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
  
      console.log('filenames count::', filesCount)
  
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
  
      console.log('responseArr length', responseArr.length)
      
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