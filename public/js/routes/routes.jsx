import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
// import AuthService from '../../utils/AuthService';
import PageContainer from '../content/page-container';
import BookmarkViewContainer from '../content/bookmark-view-container';
import BookmarkTilesContainer from '../content/bookmark-tiles-container';
import BookmarkFormContainer from '../content/bookmark-form-container';
import AppContainer from '../app-container';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="access_token=:token" />
      <Route path="/main" component={PageContainer}>
        <IndexRoute component={BookmarkTilesContainer} />
        <Route path="/bookmarks" component={BookmarkFormContainer} />
        <Route path="/bookmarks/:bookmarkId" component={BookmarkViewContainer} />
        <Route path="/folders/:folderName" component={BookmarkTilesContainer} />
        <Route path="/search/:input" component={BookmarkTilesContainer} />
      </Route>
    </Route>
  </Router>
);

export default routes;
