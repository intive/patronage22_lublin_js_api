require('dotenv').config();

// module.exports = {
//   HOST: process.env.PHOST,
//   USER: process.env.PDBUSER,
//   PASSWORD: process.env.PPASSWORD,
//   DB: process.env.PDB,
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 60000,
//     idle: 30000
//   }
// }

module.exports = {
  HOST: 'mysql51.mydevil.net',
  USER: 'm1495_patronage',
  PASSWORD: '5:1A4PA4oq#en_gBx76ByloM^vism4',
  DB: 'm1495_patronage',
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
