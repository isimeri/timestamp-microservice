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
app.get("/api", (req, res) => {
  let da = new Date();
  let objToReturn = {
    unix: da.getTime(),
    utc: da.toUTCString()
  }
  res.json(objToReturn);
})
app.get("/api/:date", function (req, res) {
  let dateStr = req.params.date;
  let objToReturn;
  let regex = /^\d+$/;

  if(regex.test(dateStr)){
    dateStr = Number(dateStr);
  }
  const da = new Date(dateStr);
  
  if(isNaN(da)){
    objToReturn = {
      error: "Invalid Date"
    };
  } else {
    objToReturn = {
      unix: da.getTime(),
      utc: da.toUTCString()
    }
  }

  res.json(objToReturn);
});


// listen for requests :)
let listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
