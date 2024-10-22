const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const weatherRoutes = require('./routes/weather');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
