'use strict';

var express = require('express');
var router = express.Router();

const nlu = require('../lib/nlu');

const features = {
    'keywords': {},
    'concepts': {},
    'sentiment': {},
    'emotion': {}
}


let tweets = (params) => {
  return new Promise((resolve, reject) => {
  var Twitter = require('twitter');

  var T = new Twitter({

    // These are my personal Twitter account credentials. If you would like to
    // use your own, you can make your own account and copy in your credentials.
    consumer_key: '3nwynoLL6pAaXkNxHOT3yP2XQ',
    consumer_secret: 'DMo5CLMjhLx2XYSk0gnpGZiTVqXnUMFBd0bG1XSGomHk75mWD0',
    access_token_key: '1006941821971419136-I0htFRGtDO2WXzxmDyRyGs5VMyY3yE',
    access_token_secret: 'ZGsweZQiV3qyUmWpFT3K0CRP2BpzGhum8rfGmEh4ULJbf'
  });

  // Initiate your search using the above paramaters
  T.get('search/tweets', params, function(err, data, response) {
    // If there is no error, proceed
    if(!err){
      // Create a filesystem and open tweets.txt file to start writing to
      var fs = require('fs');
      fs.truncate('tweets.txt', 0, function(){})
      var stream = fs.createWriteStream("tweets.txt");
      var str = '';
      stream.once('open', function(fd) {
        // Loop through the returned tweets
        for(let i = 0; i < data.statuses.length; i++){
          // Write an individual tweet into the tweets file
          stream.write(data.statuses[i].text + "\n");
          str += data.statuses[i].text + "\n";
        }
        stream.end();
        resolve(str);
      });
    } else {
      console.log(err);
      reject('Tweet update failed');
    }
    });
  });
}

router.post('/fileUpload', async function(req, res, next) {
  // Set up search parameters for Twitter API query
    var params = {
      q: '',
      count: 1000,
      result_type: 'recent',
      lang: 'en'
    }
    // Assign filter q to user entered phrase or have default as 'ibm'
    params.q = req.body.text || 'ibm';
    // Execute the function & promise and amke nlu.analyze request after tweets promise is fulfilled
    tweets(params).then( async (fromResolve) => {
    let response =  await nlu.analyze(fromResolve, features);
    // set response json to response of nlu.analyze as above
    res.json(response);
  }).catch( (fromReject) => {console.log(fromReject)});

});

module.exports = router;
