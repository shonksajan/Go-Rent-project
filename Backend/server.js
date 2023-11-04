const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer for file uploads

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'gorent',
});

app.post('/login', (req, res) => {
  const { id, password } = req.body;

  db.query('SELECT * FROM admindetails WHERE id = ? AND password = ?', [id, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.length === 1) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Incorrect credentials' });
      }
    }
  });
});

  
app.post('/addcars', upload.fields([{ name: 'carImage' }, { name: 'insuranceImage' }, { name: 'pollutionCertificateImage' }]), (req, res) => {
  const {
    vehicleName,
    modelYear,
    Fuel,
    VehicleClass,
    Enginecc,
    Chassisnumber,
    rcdetails,
  } = req.body;

  // Use the same name for the image files in the database and folder
  const carImage = req.files.carImage[0].originalname;
  const insuranceImage = req.files.insuranceImage[0].originalname;
  const pollutionCertificateImage = req.files.pollutionCertificateImage[0].originalname;

  // Save the uploaded images with their original names
  // Perform image renaming if necessary

  db.query(
    "INSERT INTO vdetails (vehicleName, modelYear, Fuel, VehicleClass, Enginecc, Chassisnumber, rcdetails, carImage, insuranceImage, pollutionCertificateImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [vehicleName, modelYear, Fuel, VehicleClass, Enginecc, Chassisnumber, rcdetails, carImage, insuranceImage, pollutionCertificateImage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.get('/viewcars', (req, res) => {
  db.query('SELECT * FROM vdetails', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});
app.get('/userslist', (req, res) => {
  db.query('SELECT * FROM signin', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.get('/taxidrivers', (req, res) => {
  db.query('SELECT * FROM taxi_driver', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.get('/uploads/car/:id', (req, res) => {
  const vId = req.params.id;
  db.query('SELECT carImage FROM vdetails WHERE vId = ?', [vId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.sendFile(__dirname+`/uploads/${result[0].carImage}`)
    }
  });
});

app.get('/uploads/insurance/:id', (req, res) => {
  const vId = req.params.id;
  db.query('SELECT insuranceImage FROM vdetails WHERE vId = ?', [vId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.sendFile(__dirname+`/uploads/${result[0].insuranceImage}`)
    }
  });
});

app.get('/uploads/pollution/:id', (req, res) => {
  const vId = req.params.id;
  db.query('SELECT pollutionCertificateImage FROM vdetails WHERE vId = ?', [vId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.sendFile(__dirname+`/uploads/${result[0].pollutionCertificateImage}`)
    }
  });
});

// Retrieve car data by ID
app.get('/getcar/:id', (req, res) => {
  const vId = req.params.id;
  db.query('SELECT * FROM vdetails WHERE vId = ?', [vId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'Car not found' });
      } else {
        res.json(result[0]);
      }
    }
  });
});

// Delete car by ID
app.delete('/deletecar/:id', (req, res) => {
  const vId = req.params.id;
  db.query('DELETE FROM vdetails WHERE vId = ?', [vId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Car deleted successfully' });
    }
  });
});

// Update car RC details by ID
app.put('/updatecar/:id', upload.fields([{ name: 'insuranceImage' }, { name: 'pollutionImage' }]), (req, res) => {
  const vId = req.params.id;
  const { rcdetails } = req.body;
  
  // Use the same name for the image files in the database and folder
  const insuranceImage = req.files.insuranceImage ? req.files.insuranceImage[0].originalname : null;
  const pollutionImage = req.files.pollutionImage ? req.files.pollutionImage[0].originalname : null;

  db.query(
    'UPDATE vdetails SET rcdetails = ?, insuranceImage = ?, pollutionCertificateImage = ? WHERE vId = ?',
    [rcdetails, insuranceImage, pollutionImage, vId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'RC details and images updated successfully' });
      }
    }
  );
});

app.listen(8081, () => {
  console.log('Server listening on port 8081');
});
