// ./src/index.js
console.log("hwllo")
// importing the dependencies
const express = require('express');
const cors = require('cors');

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



//gets prices from the webscraper 
app.post("/keywords", (req, res)=>{
  let price = ''
  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
      mode: 'text',
      pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'C:/Users/Steven/Documents/GitHub/RainChecker/xhacks_website/src/expressBackend/express-api/src/scraper', //If you are having python_test.py script in same folder, then it's optional.
      args: [req.body.name] //An argument which can be accessed in the python file using sys.argv[1]
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



app.get('/', async (req, res) => { 
  const isLoggedin = await req.session.loggedIn
  const username = await req.session.username
  const password = await req.body.password
//manual testing
// updatePrice('hello')

  // console.log(store)
  // console.log(req.sessionID)
  if(isLoggedin){
  res.send(await getWishs(username, password));
  }
  else {
    res.send({"loggedIn" : "false"})
  }

});
// signing up for an account
app.post('/signup', async (req, res) => {
  const newAcc = req.body//req.body
  console.log(req.headers)
  // console.log(req)
  await insertWish(newAcc);
  // res.send(newWish)
  res.send({ message: 'New Account inserted.' });
});

// posting an Wish to the API 
app.post('/postWish', async (req, res) => {
  const username = await req.session.username
  const email = await req.session.email
  const newWish = req.body//req.body

  console.log(username)
  await insertWish(newWish, username);
  // res.send(newWish)
  res.send({ message: 'New Wish inserted.' });
});

// logging in 
app.post('/signin', async (req, res) => {
  // find if the username even exists
  const username = req.body.username
  const password = req.body.password
  const didLogin = await loginUser(username, password)

  if (didLogin){
    res.locals.username = req.body.username
    res.locals.email = req.body.email
    req.session.loggedIn = true
    req.session.username = res.locals.username
    req.session.email = res.locals.email
    // console.log(req.sessionID)
    // console.log(store)
    res.json(req.session)
    // res.redirect('/')
    // cannot set header issue
  }
  else{
    res.sendStatus(401)

  }
    // res.send(newWish)
});


// endpoint to delete an Wish
app.delete('/', async (req, res) => {
  console.log(req.body)
  await deleteWish(req.body);
  res.send({ message: 'Wish removed.' });
});

// endpoint to update an Wish

app.put('/', async (req, res) => {
  // the values that are sent to update the values in the server are in Updated Wish
  const updatedWish = req.body;
  await updateWish(req.params.id, updatedWish);
  // the API sends back to the user that the Wish has been updated
  res.send({ message: 'Wish updated.' });
});


// start the in-memory MongoDB instance
startDatabase().then(async () => {
  // await insertWish({title: 'Hello, now from the in-memory database!'});

  // start the server
  app.listen(3001, async () => { // the express server is running on port 3001
    console.log('listening on port 3001');
  });
});

// setInterval(() => {
//     updatePrice()
// }, interval);