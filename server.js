/* ---- Dependencies ---- */
const express = require('express');
const bookmarksRoutes = require('./routes/bookmarks');
const foldersRoutes = require('./routes/folders');
const tagsRoutes = require('./routes/tags');


/* ---- Initial Setup ---- */
const app = express();
app.disable('etag');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Serve the frontend code
app.use(express.static('./public/build/'))

app.use('/bookmarks', bookmarksRoutes);
app.use('/folders', foldersRoutes);
app.use('/tags', tagsRoutes);

/* ---- Set port and start server ---- */
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
