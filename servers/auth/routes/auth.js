import express from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { validateReqBody } from '../../lib/util.js';
import User from '../../db/models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) return sendStatus(403);
    const accessToken = jwt.sign(
      { user_id: data.user_id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACESSS_TOKEN_EXPIRATION_TIME,
      }
    );
    res.json({ accessToken });
  });
});

router.post('/signup', async (req, res) => {
  if (
    validateReqBody({
      body: req.body,
      expectedPropertys: ['firstName', 'lastName', 'email', 'password'],
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

      const foundUser = await User.findOne({ email: req.body.email });
      if (foundUser) return res.sendStatus(409);
      const user = await new User({
        ...req.body,
        password: hashSync(req.body.password, process.env.HASH_SALT),
      }).save();

      const { _id } = user;
      const accessToken = jwt.sign({ user_id: _id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACESSS_TOKEN_EXPIRATION_TIME,
      });
      const refreshToken = jwt.sign({ user_id: _id }, process.env.REFRESH_TOKEN_SECRET);

      res.json({ accessToken, refreshToken });
    } catch (e) {
      res.sendStatus(500);
      console.log(e);
      return;
    }
  } else {
    res.sendStatus(406);
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
      if (!user) return res.sendStatus(404);

      const { _id, password } = user;

      if (compareSync(req.body.password, password)) {
        const accessToken = jwt.sign({ user_id: _id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACESSS_TOKEN_EXPIRATION_TIME,
        });
        const refreshToken = jwt.sign({ user_id: _id }, process.env.REFRESH_TOKEN_SECRET);

        res.json({ accessToken, refreshToken });
        return;
      }
      res.sendStatus(404);
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
