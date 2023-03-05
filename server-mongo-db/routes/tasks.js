import express, { json } from 'express';
import { validateReqBody } from '../lib/util.js';
import Tasks from '../db/models/Tasks.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.json({ result: false, error: 'Access denied' });
  try {
    const tasks = await Tasks.find({ author: req.user_id });

    res.json({
      result: true,
      tasks: tasks.map((task) => {
        return {
          id: task.id,
          description: task.description,
          ends: task.ends,
          completed: task.completed,
        };
      }),
    });
  } catch (e) {
    res.json({ result: false, error: 'Server error' });
    console.log(e);
    return;
  }
});

router.post('/add', authenticateToken, async (req, res) => {
  if (
    validateReqBody({
      body: req.body,
      expectedPropertys: ['description', 'ends', 'completed'],
      allowNull: true,
    })
  ) {
    try {
      if (String(req.body.description).length <= 3)
        return res.json({ result: false, error: 'Invalid description' });
      if (new Date(req.body.ends).toString() === 'Invalid Date')
        return res.json({ result: false, error: 'Invalid end date' });
      if (!(/true/.test(req.body.completed) || /false/.test(req.body.completed))) {
        return res.json({
          result: false,
          error: 'Invalid completed value, must be boolean',
        });
      }
      if (!req.user_id) return res.json({ result: false, error: 'Access denied' });
      const foundTask = await Tasks.findOne({
        author: req.user_id,
        description: req.body.description,
      });

      if (foundTask) return res.json({ result: false, error: 'Task already exists' });

      new Tasks({ author: req.user_id, ...req.body }).save();
      res.json({ result: true });
    } catch (e) {
      res.json({ result: false, error: 'Server error' });
      console.log(e);
      return;
    }
  } else {
    res.json({ result: false, error: 'Invalid task data' });
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.json({ result: false, error: 'Access denied' });
  if (
    validateReqBody({
      body: req.query,
      expectedPropertys: ['id'],
    })
  ) {
    if (
      validateReqBody({
        body: req.body,
        expectedPropertys: ['description', 'ends', 'completed'],
        allowNull: true,
      })
    ) {
      try {
        if (String(req.body.description).length <= 3)
          return res.json({ result: false, error: 'Invalid description' });
        if (new Date(req.body.ends).toString() === 'Invalid Date')
          return res.json({ result: false, error: 'Invalid end date' });
        if (!(/true/.test(req.body.completed) || /false/.test(req.body.completed))) {
          return res.json({
            result: false,
            error: 'Invalid completed value, must be boolean',
          });
        }
        const update = await Tasks.updateOne(
          { _id: req.query.id, author: req.user_id },
          req.body
        );
        if (update.modifiedCount > 0) return res.json({ result: true });
        return res.json({ result: false, error: 'Nothing updated' });
      } catch (e) {
        res.json({ result: false, error: 'Server error' });
        console.log(e);
        return;
      }
    } else {
      res.json({ result: false, error: 'Invalid task data' });
    }
  } else {
    res.json({ result: false, error: 'No task id given' });
  }
});

router.delete('/', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.json({ result: false, error: 'Access denied' });
  if (
    validateReqBody({
      body: req.query,
      expectedPropertys: ['id'],
    })
  ) {
    try {
      const deleted = await Tasks.deleteOne({ _id: req.query.id, author: req.user_id });
      if (deleted.deletedCount > 0) return res.json({ result: true });
      return res.json({ result: false, error: 'Nothing deleted' });
    } catch (e) {
      res.json({ result: false, error: 'Server error' });
      console.log(e);
      return;
    }
  } else {
    res.json({ result: false, error: 'No task id given' });
  }
});

export default router;
