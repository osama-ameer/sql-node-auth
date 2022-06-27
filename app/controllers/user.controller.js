exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
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

 mssql.connect(config, async function (err) {

          if (err) console.log(err);
          var request = await new mssql.Request();
          await request.query(`select * from SalesVsTarget_Main`, async  function (err,  result) {
              if(err) console.log(err.message);
              await res.status(200).send(result);

          });

      });

};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
