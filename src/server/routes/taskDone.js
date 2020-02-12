const express = require( 'express' );
const router = express.Router();
const Task = require( '../models/task' );

/*
Method to get all the tasks done
*/
router.get( '/', async ( req, res ) => {
    try {
      const tasks = await Task.find({"state": "Realizada"});
      return res.json( tasks );
    } catch ( err ) {
      return res.status( 500 ).json({ message: err.message });
    }
  });

module.exports = router;