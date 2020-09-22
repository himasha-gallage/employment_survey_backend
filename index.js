const express = require("express");
const app = express();
const employees = require("./employee-model");
const servey = require("./survey-model");
const port = 4000;
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require('body-parser');
var uri = "mongodb://localhost:27017/champ";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

router.route("/insertdata").post(function(req, res) {
    employees.insertMany(data, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
});

// router.route("/login/:email/:pw").get(function (req, res) {

//     employees.findOne({ "email" : req.params.email }, function(err, result){
//         if (err) {
//             res.send(err);
//           } else {
//               if(result.password == req.params.pw ){
//                 res.send(true);
//               }
//               else{
//                 res.send(false);
//               }

//           }
//     });
// });

router.route("/login").post(function (req, res) {

    employees.findOne({ "email" : req.body.email }, function(err, result){
        if (err) {
            res.send(err);
          } else {
              if(result.password == req.body.password ){
                res.status(200).json('success');
              }
              else{
                res.status(500).json('server error');
                
              }

          }
    });
});

router.route("/details").post(function (req, res) {

  servey.create({
    organization_culture: req.body.culture,
    infrastructure: req.body.infrastructur,
    work_environment: req.body.work,
    suggestions: req.body.suggestions

  }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});




router.route("/insertdata").post(function(req, res) {});

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});

