const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log(
    JSON.stringify({
      message: '🔍 Request received',
      timestamp: new Date().toISOString(),
      ip: req.ip,
      realIp:
        req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip,
      method: req.method,
      path: req.path,
      headers: {
        host: req.headers.host,
        'user-agent': req.headers['user-agent'],
        accept: req.headers.accept,
      },
      query: req.query,
      protocol: req.protocol,
      hostname: req.hostname,
      userAgent: req.get('user-agent'),
    })
  );

  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
