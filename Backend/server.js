const express = require('express');
const app = express();
const cors = require('cors');

const mysql = require('mysql2/promise');
const mysql2 = require('mysql2');

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


const storagepdf = multer.memoryStorage();
const uploadpdf = multer({ storagepdf });

const upload = multer({ storage });

const db = mysql.createPool({
  connectionLimit: 10,
  port: "8080",
  host: 'localhost',
  user: 'root',
  password: 'ayana',
  database: 'gorent',
});

const pool = mysql2.createConnection({
  host: "localhost",
  port: "8080",
  user: "root",
  password: "ayana",
  database: "gorent",
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
  pool.query('SELECT * FROM vdetails', (err, result) => {
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






// app.post(
//   "/register/taxi-driver",
//   uploadpdf.fields([
//     { name: "insurance", maxCount: 1 },
//     { name: "pollutionCertificate", maxCount: 1 },
//     { name: "drivingLicense", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     const {
//       firstName,
//       lastName,
//       phone,
//       address,
//       email,
//       password,
//       carName,
//       carModel,
//       seats,
//       licensePlate,
//       chassisNumber,
//       accountNumber,
//       accountName,
//       ifscCode,
//     } = req.body;

  

//     const insuranceFile = req.files["insurance"][0];
//     const pollutionCertificateFile = req.files["pollutionCertificate"][0];
//     const drivingLicenseFile = req.files["drivingLicense"][0];

    
//     if (!insuranceFile || !pollutionCertificateFile || !drivingLicenseFile) {
//       return res.status(400).json({ error: "All document files are required" });
//     }

//     try {
     
//       const userInsertSql = `
//         INSERT INTO taxi_driver (firstName, lastName, phone, address, email, password, carName, carModel, seats, licensePlate, chassisNumber, accountNumber, accountName, ifscCode)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;
//       const userInsertValues = [
//         firstName,
//         lastName,
//         phone,
//         address,
//         email,
//         password,
//         carName,
//         carModel,
//         seats,
//         licensePlate,
//         chassisNumber,
//         accountNumber,
//         accountName,
//         ifscCode,
//       ];

      
//       const userInsertResult = await db.query(
//         userInsertSql,
//         userInsertValues
//       );

//       console.log(userInsertResult[0].insertId);

//       if (!userInsertResult || !userInsertResult[0].insertId) {
       
//         console.error("User insert failed");
//         return res.status(500).json({ error: "User insert failed" });
//       }

      
//       const userId = userInsertResult[0].insertId; 
//       console.log(userId);

//       const documentInsertSql = `
//         INSERT INTO documents (user_id, insurance, pollution_certificate, driving_license)
//         VALUES (?, ?, ?, ?)
//       `;
//       const documentInsertValues = [
//         userId, 
//         insuranceFile.buffer, 
//         pollutionCertificateFile.buffer,
//         drivingLicenseFile.buffer,
//       ];

      
//       await db.query(documentInsertSql, documentInsertValues);

//       console.log("User registered successfully");
//       res.status(200).json({ message: "User registered successfully" });
//     } catch (error) {
//       console.error("Error registering user:", error);
//       res.status(500).json({ error: "Error registering user" });
//     }
//   }
// );


app.post(
  "/register/taxi-driver",
  uploadpdf.fields([
    { name: "insurance", maxCount: 1 },
    { name: "pollutionCertificate", maxCount: 1 },
    { name: "drivingLicense", maxCount: 1 },
    { name: "additionalImage", maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      firstName,
      lastName,
      phone,
      address,
      email,
      password,
      carName,
      carModel,
      seats,
      rate,
      acType,
      licensePlate,
      chassisNumber,
      accountNumber,
      accountName,
      ifscCode,
    } = req.body;

    const insuranceFile = req.files["insurance"][0];
    const pollutionCertificateFile = req.files["pollutionCertificate"][0];
    const drivingLicenseFile = req.files["drivingLicense"][0];
    const additionalImageFile = req.files["additionalImage"][0];

    if (
      !insuranceFile ||
      !pollutionCertificateFile ||
      !drivingLicenseFile ||
      !additionalImageFile
    ) {
      return res
        .status(400)
        .json({ error: "All document files are required" });
    }

    try {
      const userInsertSql = `
        INSERT INTO taxi_driver (firstName, lastName, phone, address, email, password, carName, carModel, seats, rate,,acType,licensePlate, chassisNumber, accountNumber, accountName, ifscCode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
      `;
      const userInsertValues = [
        firstName,
        lastName,
        phone,
        address,
        email,
        password,
        carName,
        carModel,
        seats,
        rate,
        acType,
        licensePlate,
        chassisNumber,
        accountNumber,
        accountName,
        ifscCode,
      ];

      const userInsertResult = await db.query(
        userInsertSql,
        userInsertValues
      );

      if (!userInsertResult || !userInsertResult[0].insertId) {
        console.error("User insert failed");
        return res.status(500).json({ error: "User insert failed" });
      }

      const userId = userInsertResult[0].insertId;

      const documentInsertSql = `
        INSERT INTO documents (user_id, insurance, pollution_certificate, driving_license, additional_image)
        VALUES (?, ?, ?, ?, ?)
      `;
      const documentInsertValues = [
        userId,
        insuranceFile.buffer,
        pollutionCertificateFile.buffer,
        drivingLicenseFile.buffer,
        additionalImageFile.buffer,
      ];

      await db.query(documentInsertSql, documentInsertValues);

      console.log("User registered successfully");
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  }
);

app.post("/api/taxi/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  try {
    
    const connection = await db.getConnection();

    
    const [rows, fields] = await connection.execute(
      'SELECT * FROM taxi_driver where email = ? and password = ?',
      [username, password]
    );

    connection.release(); 

    if (rows.length > 0) {
     
      res.json(rows);
    } else {
      
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Database error' });
  }
});




app.get('/api/driver/:id', (req, res) => {
 
  const id = req.params['id'];
  const sql = "SELECT * FROM taxi_driver  where taxi_driver.id = ?";
  const value = [id];
  pool.query(sql, value, (err, result) => {
    if (err) {
      console.error("Error retrieving taxi_driver:", err);
      res.status(500).json({ error: "Error retrieving taxi_driver" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "user not found" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});



app.post('/api/driver/update/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const sql = `
      UPDATE taxi_driver
      SET firstName = ?,
          lastName = ?,
          phone = ?,
          address = ?,
          email = ?,
          carName = ?,
          carModel = ?,
          seats = ?,
          rate= ?,
          acType = ?,
          licensePlate = ?,
          chassisNumber = ?,
          accountNumber = ?,
          accountName = ?,
          ifscCode = ?
      WHERE id = ?
    `;

    const values = [
      updatedData.firstName,
      updatedData.lastName,
      updatedData.phone,
      updatedData.address,
      updatedData.email,
      updatedData.carName,
      updatedData.carModel,
      updatedData.seats,
      updatedData.rate,
      updatedData.acType,
      updatedData.licensePlate,
      updatedData.chassisNumber,
      updatedData.accountNumber,
      updatedData.accountName,
      updatedData.ifscCode,
      id,
    ];

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Driver profile updated successfully' });
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    console.error('Error updating driver profile:', error);
    res.status(500).json({ error: 'Error updating driver profile' });
  }
});




app.get('/download/insurance/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  const sql = 'SELECT insurance FROM documents WHERE user_id = ?';

  pool.query(sql, [pdfId], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Error retrieving PDF' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'PDF not found' });
      return;
    }

    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    
    res.end(result[0].insurance, 'binary');
  });
});

app.get('/download/driving_license/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  
  const sql = 'SELECT driving_license FROM documents WHERE user_id = ?';

  pool.query(sql, [pdfId], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Error retrieving PDF' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'PDF not found' });
      return;
    }

    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    
    res.end(result[0].driving_license, 'binary');
  });
});

app.get('/download/pollution_certificate/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;

  
  const sql = 'SELECT pollution_certificate FROM documents WHERE user_id = ?';

  pool.query(sql, [pdfId], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Error retrieving PDF' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'PDF not found' });
      return;
    }

    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="downloaded.pdf"`);

    console.log(result[0]);
    
    res.end(result[0].pollution_certificate, 'binary');
  });
});

app.get('/api/carlist', (req, res) => {
  const sql = `
    SELECT taxi_driver.carModel, taxi_driver.carName, taxi_driver.seats, taxi_driver.rate,taxi_driver.acType, documents.additional_image FROM taxi_driver INNER JOIN documents ON taxi_driver.id = documents.user_id`;

  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving taxi_driver:", err);
      res.status(500).json({ error: "Error retrieving taxi_driver" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "user not found" });
    } else {
      // Convert additional_image field to base64
      result = result.map((row) => {
        if (row.additional_image instanceof Buffer) {
          row.additional_image = row.additional_image.toString('base64');
        }
        return row;
      });

      console.log(result);
      res.status(200).json(result);
    }
  });
});




app.listen(8081, () => {
  console.log('Server listening on port 8081');
});
