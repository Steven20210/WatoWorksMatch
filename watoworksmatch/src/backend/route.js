// ./src/index.js
console.log("hwllo")
// importing the dependencies
const express = require('express');
const cors = require('cors');
const ResumeParser = require('resume-parser');
const {PythonShell} =require('python-shell');

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

  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'C:/Users/Steven/Documents/GitHub/WatoWorksMatch/watoworksmatch/src/backend', //If you are having python_test.py script in same folder, then it's optional.
    args: [resume] //An argument which can be accessed in the python file using sys.argv[1]
};
 

PythonShell.run('scraper.py', options, function (err, result){
      if (err) throw err;
      // result is an array consisting of messages collected
      //during execution of script.
      console.log('price: ', result.toString());  
      price = result.toString()    
      res.send(price)
      
      
});



  


});



app.listen(3001, async () => { // the express server is running on port 3001
    console.log('listening on port 3001');
  });
