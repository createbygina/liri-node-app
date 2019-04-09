console.log('this is loaded');

require('dotenv').config();

module.exports = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
}