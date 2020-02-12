const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );
const app = express();
const dotenv = require('dotenv');
dotenv.config();

async function startServer({ port = process.env.SERVER_PORT } = {}) {
  port = port || 8888;
  app.use( cors() );
  app.use(bodyParser.json());

    const databaseURL = process.env.DATABASE_URL;

    mongoose.connect( databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on( 'error', err => console.error( 'DB error', err ) );
    db.once( 'open', () => console.log( 'Connected to db' ) );

  const taskRoutes = require( './routes/tasks' );
  const taskDoneRoutes = require( './routes/taskDone' );
  const taskPendingRoutes = require( './routes/taskPending' );

  app.use( '/task', taskRoutes );
  app.use( '/taskDone', taskDoneRoutes );
  app.use( '/taskPending', taskPendingRoutes);

  return new Promise( resolve => {
    const server = app.listen( port, () => {
      console.log( `Listening on port ${server.address().port}` );
      const originalClose = server.close.bind( server );
      server.close = () => {
        return new Promise( resolveClose => {
          originalClose( resolveClose );
        });
      };
      resolve( server );
    });
  });
}

  startServer({ port: process.env.PORT });

module.exports = startServer;

//app.use('/', (req, res) => {
 // res.status(200).send('La API funciona correctamente!');
 // console.log('corriendo');
  //console.log(`Your port is ${process.env.SERVER_PORT}`);
//});

//app.listen(process.env.SERVER_PORT);