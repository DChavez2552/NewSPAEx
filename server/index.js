require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const pizzas = require("./controllers/pizzas")
const orders = require("./controllers/orders")

mongoose.connect(process.env.DB_CONNECT);
const app = express();
const db = mongoose.connection;

let db_status = 'MongoDB connection not successful.';
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => db_status = 'Successfully opened connection to Mongo!');
//^^These lines are always at top

const myMiddleware = (request, response, next) => {
  // do something with request and/or response
  console.log(request.method, request.path);
  next(); // tell express to move to the next middleware function
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

//Convert string json to javascript object
app.use(express.json());
app.use(myMiddleware);
app.use(cors);


app.use("/pizzas", pizzas);
app.use("/orders", orders);

//Contract of data

//Convert schema into model with crud operators


//Create route aka POST
app.route("/")
  .get((request, response) => {
    response.send("HELLO WORLD");
  })
  .post((request, response) => {
    response.json(request.body);
  });


app.route("/**").get((request, response) => {
  response.status(404).send("NOT FOUND");
});

//This line is always last
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


