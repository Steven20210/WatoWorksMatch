// ./src/index.js
console.log("hwllo")
// importing the dependencies
const express = require('express');
const cors = require('cors');
const ResumeParser = require('resume-parser');

// defining the Express app
const app = express();


// enabling CORS for all requests
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


// using bodyParser to parse JSON bodies into JS objects, we always need to parse bodies before making any HTTP Requests
app.use(bodyParser.json({ // need to use json
  extended: true
}));



// gets resume keypoints 
app.post("/resume", (req, res)=>{

  let directory = await req.directory
  let filename = await req.filename
  
  let resume = {}
  ResumeParser.parseResumeFile(directory/filename, directory)
  .then(file => {
    console.log(file)
    resume = file
  });

  


});



app.listen(3001, async () => { // the express server is running on port 3001
    console.log('listening on port 3001');
  });
