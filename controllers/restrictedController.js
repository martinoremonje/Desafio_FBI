import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'mysecretkey';

export const accessRestricted = (req, res) => {
  const token = req.query.token;
  console.log(`Access attempt with token: ${token}`);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(`Token verification failed: ${err.message}`);
      res.status(401).send({ message: 'Unauthorized', error: err.message });
    } else {
      console.log(`Token verified, welcome: ${decoded.email}`);
      res.send(`
        <html>
          <head>
            <title>Welcome</title>
          </head>
          <body>
            <p>Welcome, ${decoded.email}</p>
            <script>
              localStorage.setItem('email', '${decoded.email}');
            </script>
          </body>
        </html>
      `);
    }
  });
};