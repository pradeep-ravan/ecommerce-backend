const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/index');

const { connectDB } = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

async function startServer() {
  try {
    await connectDB(app);
    app.use('/api', routes);
    app.listen(PORT, () => {
      console.log(`Server is now listening on port ${PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
}

startServer();
