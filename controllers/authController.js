import jwt from 'jsonwebtoken';
import { results as agents } from '../data/db.js';

const secretKey = process.env.SECRET_KEY || 'mysecretkey';

export const login = (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt with email: ${email}`);

  const agent = agents.find(a => a.email === email && a.password === password);

  if (agent) {
    const token = jwt.sign({ email: agent.email }, secretKey, { expiresIn: '2m' });
    console.log(`Token generated: ${token}`);
    res.send(`
      <html>
        <head>
          <title>Agent Authorized</title>
        </head>
        <body>
          <p>Email: ${agent.email}</p>
          <script>
            sessionStorage.setItem('token', '${token}');
          </script>
          <a href="/restricted?token=${token}">Go to restricted area</a>
        </body>
      </html>
    `);
  } else {
    console.log('Unauthorized access attempt');
    res.status(401).send('Unauthorized');
  }
};