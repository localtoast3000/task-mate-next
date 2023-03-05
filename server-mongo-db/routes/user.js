import express from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { validateReqBody } from '../lib/util.js';
import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.json({ result: false, error: 'Access denied' });
  try {
    const user = await User.findOne({ _id: req.user_id });
    res.json({
      result: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (e) {
    res.json({ result: false, error: 'Server error' });
    console.log(e);
    return;
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.json({ result: false, error: 'Access denied' });
  if (
    validateReqBody({
      body: req.body,
      expectedPropertys: ['firstName', 'lastName', 'email'],
      allowNull: true,
    })
  ) {
    try {
      if (String(req.body.firstName).length < 1)
        return res.json({ result: false, error: 'Invalid first name' });
      if (String(req.body.lastName).length < 1)
        return res.json({ result: false, error: 'Invalid last name' });
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/.test(
          String(req.body.email)
        )
      )
        return res.json({ result: false, error: 'Invalid email' });
      const update = await User.updateOne({ _id: req.user_id }, req.body);
      if (update.modifiedCount > 0) return res.json({ result: true });
      return res.json({ result: false, error: 'Nothing updated' });
    } catch (e) {
      res.json({ result: false, error: 'Server error' });
      console.log(e);
      return;
    }
  } else {
    res.json({ result: false, error: 'Invalid user data' });
  }
});

router.delete('/', authenticateToken, async (req, res) => {
  if (!req.user_id) return res.json({ result: false, error: 'Access denied' });
  try {
    const deleted = await User.deleteOne({ _id: req.user_id });
    if (deleted.deletedCount > 0) return res.json({ result: true });
    return res.json({ result: false, error: 'Nothing deleted' });
  } catch (e) {
    res.json({ result: false, error: 'Server error' });
    console.log(e);
    return;
  }
});

router.post('/signup', async (req, res) => {
  if (
    validateReqBody({
      body: req.body,
      expectedPropertys: ['firstName', 'lastName', 'email', 'password'],
    })
  ) {
    try {
      if (String(req.body.firstName).length < 1)
        return res.json({ result: false, error: 'Invalid first name' });
      if (String(req.body.lastName).length < 1)
        return res.json({ result: false, error: 'Invalid last name' });
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/.test(
          String(req.body.email)
        )
      )
        return res.json({ result: false, error: 'Invalid email' });
      const foundUser = await User.findOne({ email: req.body.email });
      if (foundUser) return res.json({ result: false, error: 'User already exists' });
      const user = await new User({
        ...req.body,
        password: hashSync(req.body.password, 10),
      }).save();

      const { _id } = user;
      const token = jwt.sign({ user_id: _id }, process.env.ACCESS_TOKEN_SECRET);

      res.json({ result: true, token });
    } catch (e) {
      res.json({ result: false, error: 'Server error' });
      console.log(e);
      return;
    }
  } else {
    res.json({ result: false, error: 'Invalid signup data' });
  }
});

router.post('/login', async (req, res) => {
  if (
    validateReqBody({
      body: req.body,
      expectedPropertys: ['email', 'password'],
    })
  ) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.json({ result: false, error: 'User not found' });

      const { _id, password } = user;

      if (compareSync(req.body.password, password)) {
        const token = jwt.sign({ user_id: _id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ result: true, token });
        return;
      }
      res.json({ result: false, error: 'User not found ' });
    } catch (e) {
      res.json({ result: false, error: 'Server error' });
      console.log(e);
      return;
    }
  } else {
    res.json({ result: false, error: 'Invalid login data' });
  }
});

export default router;
