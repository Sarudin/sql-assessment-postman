const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive({
  host: 'localhost',
  port: 5432,
  database: 'assessbox',
  user: 'postgres',
  password: 'bigbrush1'
}).then( db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build enpoints below ============

app.get('/api/users', function(req, res) {
  req.app.get('db').getAllUsers().then(allUsers => {
      res.status(200).send(allUsers);
  });
});

app.get('/api/vehicles', function(req, res) {
  req.app.get('db').getAllVehicles().then(allVehicles => {
      res.status(200).send(allVehicles);
  });
});

app.post('/api/users', function(req, res) {
  req.app.get('db').addUser([req.body.name, req.body.email]).then(addedUser => {
    res.status(200).send(addedUser);
  });
});

app.post('/api/vehicles', function(req, res) {
  req.app.get('db').addVehicle([req.body.make, req.body.model, req.body.year, req.body.owner_id]).then(addedVehicle => {
    res.status(200).send(addedVehicle);
  });
});

app.get('/api/user/:userId/vehiclecount', function(req, res) {
  req.app.get('db').countVehicles(req.params.userId).then(count => {
    res.status(200).send(count);
  });
});

app.get('/api/user/:userId/vehicle', function(req, res) {
  req.app.get('db').getVehiclesById(req.params.userId).then(vehiclesById => {
    res.status(200).send(vehiclesById);
  });
});

app.get('/api/vehicle', function(req, res) {
  if (req.query.userEmail) {
    req.app.get('db').getVehiclesByEmail(req.query.userEmail).then(vehiclesByEmail => {
      res.status(200).send(vehiclesByEmail);
    });
  }
  else if (req.query.userFirstStart) {
    req.app.get('db').getVehiclesByFirstLetters(req.query.userFirstStart + "%").then(vehiclesByFirstLetters => {
      res.status(200).send(vehiclesByFirstLetters);
    });
  }
});

app.get('/api/newervehiclesbyyear', function(req, res) {
  req.app.get('db').getVehiclesByYear().then(vehiclesByYear => {
    res.status(200).send(vehiclesByYear);
  });
});

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
  req.app.get('db').changeOwner([req.params.vehicleId, req.params.userId]).then(changedOwner => {
    res.status(200).send(changedOwner);
  });
});

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {
  req.app.get('db').removeOwner([req.params.vehicleId, req.params.userId]).then(removedOwner => {
    res.status(200).send(removedOwner);
  });
});

app.delete('/api/vehicle/:vehicleId', function(req, res) {
  req.app.get('db').deleteVehicle([req.params.vehicleId]).then(deletedVehicle => {
    res.status(200).send(deletedVehicle);
  });
});

// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
