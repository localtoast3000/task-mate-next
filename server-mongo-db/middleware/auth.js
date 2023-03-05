import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.json({ result: false, error: 'Access denied' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.json({ result: false, error: 'Server error' });
      console.log(err);
      return;
    }
    req.user_id = user.user_id;
    next();
  });
}
