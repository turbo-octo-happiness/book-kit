import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import PageContainer from '../page-container';
import BookmarkViewContainer from '../content/bookmark-view-container';
import BookmarkTilesContainer from '../content/bookmark-tiles-container';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={PageContainer}>
      <IndexRoute component={BookmarkTilesContainer} />
      <Route path="/bookmarks/:bookmarkId" component={BookmarkViewContainer} />
      <Route path="/folders/:folderName" component={BookmarkTilesContainer} />
      <Route path="/search/:input" component={BookmarkTilesContainer} />
    </Route>
  </Router>
);

module.exports = routes;
