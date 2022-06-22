const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get('/data',  async function (req, res) {

  const mssql = require('mssql/msnodesqlv8'); 

    var config = {
        database:'DSRvsMREP',
        server: 'REMOTEAPP\\REMOTEAPP',
        user:'HPL\\out.dev2',
        password: '',
        driver: 'msnodesqlv8',
        connectionTimeout: 300000,
    requestTimeout: 300000,

    // domain: "HPL",
    options: {
      trustedConnection: true,
      //   enableArithAbort: true
    },
    pool: {
      idleTimeoutMillis: 300000,
        max: 100
        }
       
      };

  await mssql.connect(config, async function (err) {

            if (err) console.log(err);
            var request = await new mssql.Request();
            await request.query(`
            Select Top(100) * from MacroBrickTarget`, async  function (err,  result) {
                if(err) console.log(err.message);
                await res.send(result);

            });

        });
 
   });


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}