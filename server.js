const express = require('express')
const app = express()
const mongo = require('mongodb')
const mongoclient = mongo.MongoClient;
const cors = require('cors');

require('dotenv').config()

const port = process.env.PORT || 4000;
const mongourl = process.env.mongodb_url;

let db;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//City Data
app.get('/location', (req, res) => {
  db.collection('city').find().toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

//Mealtype Data
app.get('/mealtype', (req, res) => {
  db.collection('mealtype').find().toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

//Cuisine Data
app.get('/cuisine', (req, res) => {
  db.collection('cuisine').find().toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

//Restaurant Data with param condition (id) 
app.get('/restaurantdetails/:id', (req, res) => {

  var idp = req.params.id
  var query = { _id: idp }

  db.collection('restaurant').find(query).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

//Restaurant Data with query condition (city and mealtype)
app.get('/restauranthome', (req, res) => {

  var query = {};
  var cq = req.query.city;    //cq- city query
  var mq = req.query.mealtype;    //mq - mealtype query

  if (cq && mq) { query = { city: cq, "type.mealtype": mq } }
  else if (cq) { query = { city: cq } }
  else if (mq) { query = { "type.mealtype": mq } }
  else { query = {} }

  db.collection('restaurant').find(query).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


//Restaurant Data filter with param and query condition (city, mealtype || cuisine, cost (lc & hq), sort)
app.get('/restaurantlist/:city/:mealtype', (req, res) => {

  var query = {};
  var sort = {};

  var cp = req.params.city;
  var mp = req.params.mealtype;

  var cuq = req.query.cuisine;
  var lcq = req.query.lcost; var hcq = req.query.hcost;
  var sq = req.query.sort;

  if (cuq && lcq && hcq && sq) {
    query = {
      city: cp, "type.mealtype": mp,
      "Cuisine.cuisine": cuq,
      cost: { $gt: parseInt(lcq), $lt: parseInt(hcq) }
    }
    sort = { cost: parseInt(sq) }
  }
  else if (cuq && lcq && hcq) {
    query = {
      city: cp, "type.mealtype": mp,
      "Cuisine.cuisine": cuq,
      cost: { $gt: parseInt(lcq), $lt: parseInt(hcq) }
    }
  }
  else if (lcq && hcq && sq) {
    query = {
      city: cp, "type.mealtype": mp,
      cost: { $gt: parseInt(lcq), $lt: parseInt(hcq) }
    }
    sort = { cost: parseInt(req.query.sort) }
  }
  else if (cuq && sq) {
    query = {
      city: cp, "type.mealtype": mp,
      "Cuisine.cuisine": cuq
    }
    sort = { cost: parseInt(req.query.sort) }
  }
  else if (cuq) {
    query = {
      city: cp, "type.mealtype": mp,
      "Cuisine.cuisine": cuq
    }
  }
  else if (sq) {
    query = { city: cp, "type.mealtype": mp }
    sort = { cost: parseInt(sq) }
  }
  else if (lcq && hcq) {
    query = {
      city: cp, "type.mealtype": mp,
      cost: { $gt: parseInt(lcq), $lt: parseInt(hcq) }
    }
  }
  else {
    query = { city: cp, "type.mealtype": mp }
    sort = { cost: 1 }
  }

  db.collection('restaurant').find(query).sort(sort).toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Place Order
app.get('/orderlist', (req, res) => {
  db.collection('orders').find({}).toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })
})

app.post('/placeorder', (req, res) => {

  var data = {
    _id: req.body.order_id,
    rest_id: req.body.rest_id,
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    address: req.body.address,
    persons: req.body.persons
  }

  db.collection('orders').insert(data, (err, result) => {
    if (err) throw err;
    console.log("Order Placed")
  })
})

//connect to mongodb
mongoclient.connect(mongourl, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db('mydata')
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${port}`)
  })
})