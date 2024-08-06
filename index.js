const express = require('express');
const dotenv = require('dotenv');
const Boom = require('boom');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerSetup = require('./swagger');

const CommonHelper = require('./server/helpers/CommonHelper');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const frontendUrl = process.env.SITE_URL || 'http://localhost:3000';

// Import Route
const auth = require('./server/api/auth');
const product = require('./server/api/product');
const verifyToken = require('./server/middleware/verifyToken');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: frontendUrl }));
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.path.startsWith('/doc')) {
    return next();
  }
  const oldSend = res.send;
  res.send = async (data) => {
    res.send = oldSend; // set function back to avoid the 'double-send'
    const response = CommonHelper.unifyResponse(req, res, data);

    // Log Transaction
    const logData = CommonHelper.logRequest(req, response);

    CommonHelper.log(['API Request', 'info'], logData);
    return res.status(response.statusCode).send(response.bodyResponse); // just call as normal with data
  };

  next();
});

// Route middlewares
// Swagger setup
swaggerSetup(app);
app.use('/api/v1/', auth);
app.use('/api/v1/product', verifyToken, product);

app.get('/sys/ping', (req, res) => {
  req.startTime = process.hrtime();
  res.send('ok');
});

app.all('*', (req, res) => {
  res.status(404).send(Boom.notFound('No route matched with those values', {}));
});

app.listen(port, () => {
  CommonHelper.log(['Info'], `Server started on port ${port}`);
});
