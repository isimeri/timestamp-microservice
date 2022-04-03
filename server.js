// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();
let PORT = process.env.PORT || 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date", (req, res) => {
  let dateParam = req.params.date
  if(!dateParam.includes('-')){
    dateParam = parseInt(req.params.date);
  }
  const da = new Date(dateParam);
  const objToReturn = {
    unix: da.getTime(),
    utc: da.toUTCString()
  }
  res.json(objToReturn);
});


// listen for requests :)
let listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
