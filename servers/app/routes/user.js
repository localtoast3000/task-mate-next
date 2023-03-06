import express from 'express';
import { validateReqBody } from '../../lib/util.js';
import User from '../../db/models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.sendStatus(403);
  try {
    const user = await User.findOne({ _id: req.user_id });
    if (!user) return res.sendStatus(406);
    res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
    return;
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.sendStatus(403);
  if (
    validateReqBody({
      body: req.body,
      expectedPropertys: ['firstName', 'lastName', 'email'],
      allowNull: true,
    })
  ) {
    try {
      if (
        String(req.body.firstName).length < 1 ||
        String(req.body.lastName).length < 1 ||
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/.test(
          String(req.body.email)
        )
      )
        return res.sendStatus(406);

      const update = await User.updateOne({ _id: req.user_id }, req.body);
      if (update.modifiedCount > 0) return res.sendStatus(200);

      return res.sendStatus(304);
    } catch (e) {
      res.sendStatus(500);
      console.log(e);
      return;
    }
  } else {
    res.sendStatus(406);
  }
});

router.delete('/', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.sendStatus(403);
  try {
    const deleted = await User.deleteOne({ _id: req.user_id });
    if (deleted.deletedCount > 0) return res.sendStatus(200);
    return res.sendStatus(304);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
    return;
  }
});

export default router;
