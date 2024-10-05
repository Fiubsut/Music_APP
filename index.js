const express = require("express");
const connectDB = require("./app/untils/mongodb.util.js")
const userRoutes = require('./app/routes/user.route.js');
const artistRoutes = require('./app/routes/artist.route.js');
const albumRoutes = require('./app/routes/album.route.js');
const genreRoutes = require('./app/routes/genre.route.js');
const trackRoutes = require('./app/routes/track.route.js');
const playlistRoutes = require('./app/routes/playlist.route.js');
const likeRoutes = require('./app/routes/user.route.js');
require('dotenv').config();



const app = express();

app.use(express.json());
connectDB();

app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/likes', likeRoutes);




app.get('/', (req, res) => {
    res.json({message: 'Welcome to Music app'});
  });
  
  // Cấu hình cổng
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });

module.exports = app;

