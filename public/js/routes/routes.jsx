import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
// import AuthService from '../../utils/AuthService';
import PageContainer from '../page-container';
import BookmarkViewContainer from '../content/bookmark-view-container';
import BookmarkTilesContainer from '../content/bookmark-tiles-container';
import Container from '../content/app-container';
import Login from '../content/login';

// const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

// onEnter callback to validate authentication in private routes
// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname: '/' })
//   }
// }
//
// // OnEnter for callback url to parse access_token
// const parseAuthHash = (nextState, replace) => {
//   auth.parseHash(nextState.location.hash)
//   replace({ pathname: '/main' })
// }


const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Container}>
      <Route path="access_token=:token" />
      <Route path="/main" component={PageContainer}>
        <IndexRoute component={BookmarkTilesContainer} />
        <Route path="/bookmarks/:bookmarkId" component={BookmarkViewContainer} />
        <Route path="/folders/:folderName" component={BookmarkTilesContainer} />
        <Route path="/search/:input" component={BookmarkTilesContainer} />
      </Route>
    </Route>
  </Router>
);

export default routes;
