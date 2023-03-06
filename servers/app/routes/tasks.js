import express from 'express';
import { validateReqBody } from '../../lib/util.js';
import Tasks from '../../db/models/Tasks.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.sendStatus(403);

  try {
    const tasks = await Tasks.find({ author: req.user_id });

    res.json({
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
    res.sendStatus(500);
    console.log(e);
    return;
  }
});

router.post('/add', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.sendStatus(403);

  if (
    validateReqBody({
      body: req.body,
      expectedPropertys: ['description', 'ends', 'completed'],
      allowNull: true,
    })
  ) {
    try {
      if (
        String(req.body.description).length <= 3 ||
        new Date(req.body.ends).toString() === 'Invalid Date' ||
        !(/true/.test(req.body.completed) || /false/.test(req.body.completed))
      )
        return res.sendStatus(406);

      const foundTask = await Tasks.findOne({
        author: req.user_id,
        description: req.body.description,
      });

      if (foundTask) return res.sendStatus(409);

      new Tasks({ author: req.user_id, ...req.body }).save();
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
      console.log(e);
      return;
    }
  } else {
    res.sendStatus(406);
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.sendStatus(403);
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
        if (
          String(req.body.description).length <= 3 ||
          new Date(req.body.ends).toString() === 'Invalid Date' ||
          !(/true/.test(req.body.completed) || /false/.test(req.body.completed))
        )
          return res.sendStatus(406);

        await Tasks.updateOne({ _id: req.query.id, author: req.user_id }, req.body);
        res.sendStatus(200);
      } catch (e) {
        res.sendStatus(500);
        console.log(e);
        return;
      }
    } else {
      res.sendStatus(406);
    }
  } else {
    res.sendStatus(406);
  }
});

router.delete('/', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.sendStatus(403);
  if (
    validateReqBody({
      body: req.query,
      expectedPropertys: ['id'],
    })
  ) {
    try {
      await Tasks.deleteOne({ _id: req.query.id, author: req.user_id });
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
      console.log(e);
      return;
    }
  } else {
    res.sendStatus(406);
  }
});

export default router;
