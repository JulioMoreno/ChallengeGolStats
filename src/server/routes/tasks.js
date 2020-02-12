const express = require( 'express' );
const router = express.Router();

const mongoose = require( 'mongoose' );
const Task = require( '../models/task' );


/*
Method to create one task
*/ 
router.post( '/', async ( req, res ) => {
    const { title, state, priority, datetime } = JSON.parse(req.body.body);
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    state: state,
    priority: priority,
    datetime: datetime
  });

  try {
    const newItem = await task.save();
    return res.status( 200 ).json( newItem );
  } catch ( err ) {
    return res.status( 400 ).json({ message: err.message });
  }

});

/*
Method to get a task
*/ 
router.get( '/:id', async ( req, res ) => {
    try {
        const tasks = await Task.find({"_id":req.params.id});
        return res.json( tasks );
      } catch ( err ) {
        return res.status( 500 ).json({ message: err.message });
      }
  });

  router.delete( '/:id', async ( req, res ) => {
    try {
        const tasks = await Task.remove({ "id_": req.params.id }).exec();
      return res.status( 200 ).json({ message: `The task with ID ${req.params.id} has been deleted` });
    } catch( err ) {
      res.status( 500 ).json({ message: err.message });
    }
  });

module.exports = router;