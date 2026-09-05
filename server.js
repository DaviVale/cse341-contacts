const express = require('express');
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', contactsRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});