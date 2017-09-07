const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/*@async parallel multiple async call*/
const async = require('async');
/*node-wikipedia and google api to get search data*/
const wiki = require("node-wikipedia");
const google = require('google');
/*config the app with static file*/
app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/fe'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Please use /api/search');
})
;

/*get api to search the perticular keyword*/
app.get('/api/search/:_toSearch', (req, res) => {
  var keyWord = req.params._toSearch
  var result = []
  var result1, result2;

  var test_task = [
      function (callback) {
          wiki.page.data(keyWord, {content: true}, (response) => {
              if(response !== undefined)
            {
              result.push({'body': response.text["*"], 'title': 'Wikipedia'});
            }
          callback();
        });
      },
      function (callback) {
          google(keyWord, (err, res) => {
              res["title"] = "google";
          result.push(res)
          callback()
        });
      }

  ]

  async.parallel(test_task, (err) => {
      if(err){
          throw err;
      }
      else{
          setTimeout(function(){
              res.send({'results': result});
          }, 6000
    )}

  });

});

app.listen(app.get('port'));
console.log('Web server listening on port ' + app.get('port'));
