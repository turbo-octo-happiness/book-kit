import fetch from 'isomorphic-fetch';
import actionTypes from './constants';

// URL for heroku: https://shrouded-journey-65738.herokuapp.com/
// URL for localhost: https://localhost:5000

/* Fetch Helper Function */

function fetchHelp(url, init = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, init).then((res) => {
      console.log(res.status);
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.response = res;
        reject(error);
      }

      resolve(res.json());
    });
  });
}

/* Auth Lock Actions */

function loginSuccess(token, profile) {
  return {
    profile,
    token,
    type: actionTypes.LOGIN_SUCCESS,
  };
}

function loginError(error) {
  return {
    error,
    type: actionTypes.LOGIN_ERROR,
  };
}

function logoutSuccess() {
  console.log('inside logoutsuccess');
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
}

function logout() {
  console.log('inside actions');
  return dispatch => {
    console.log('inside dispatch');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    return dispatch(logoutSuccess());
  };
}

/* Redux Action Creators */

function searchTextChange(text) {
  return {
    text,
    type: actionTypes.SEARCH_TEXT_CHANGE,
  };
}

/* BOOKMARK ACTIONS */
// Get Requests
function getBookmarksSuccess(bookmarks) {
  return {
    bookmarks,
    type: actionTypes.GET_BOOKMARKS_SUCCESS,
  };
}

function getBookmarksError(error) {
  return {
    error,
    type: actionTypes.GET_BOOKMARKS_ERROR,
  };
}

function getBookmarks(token) {
  console.log('token -> ', token)
  return (dispatch) => {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = 'http://localhost:5000/bookmarks';
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmarks) => {
      return dispatch(
        getBookmarksSuccess(bookmarks)
      );
    }).catch((error) => {
      return dispatch(
        getBookmarksError(error)
      );
    });
  };
}
// Post Requests
function addBookmarkSuccess(newBookmark) {
  return {
    type: actionTypes.ADD_BOOKMARK_SUCCESS,
    bookmark: newBookmark,
  };
}

function addBookmarkError(error) {
  return {
    error,
    type: actionTypes.ADD_BOOKMARK_ERROR,
  };
}

function addBookmark(newBookmark, token) {
  console.log('inside addBookmark', newBookmark);
  console.log(token);
  return (dispatch) => {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(newBookmark),
    };

    const url = 'http://localhost:5000/bookmarks';
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmark) => {
      console.log(bookmark);
      return dispatch(addBookmarkSuccess(bookmark));
    }).catch((error) => {
      console.log(error);
      return dispatch(addBookmarkError(error));
    });
  };
}

// Put Requests
function editBookmarkSuccess(editedBookmark) {
  return {
    type: actionTypes.EDIT_BOOKMARK_SUCCESS,
    bookmark: editedBookmark,
  };
}

function editBookmarkError(error) {
  return {
    error,
    type: actionTypes.EDIT_BOOKMARK_ERROR,
  };
}

function editBookmark(editedBookmark, token) {
  return (dispatch) => {
    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedBookmark),
    };

    const url = `http://localhost:5000/bookmarks/${editedBookmark.bookmarkid}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmark) => {
      return dispatch(editBookmarkSuccess(bookmark));
    }).catch((err) => {
      return dispatch(editBookmarkError(err));
    });
  };
}

// Delete Requests
function deleteBookmarkSuccess(deletedBookmark) {
  return {
    type: actionTypes.DELETE_BOOKMARK_SUCCESS,
    bookmark: deletedBookmark,
  };
}

function deleteBookmarkError(error) {
  return {
    error,
    type: actionTypes.DELETE_BOOKMARK_ERROR,
  };
}

function deleteBookmark(bookmarkid, token) {
  return (dispatch) => {
    const init = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `http://localhost:5000/bookmarks/${bookmarkid}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmark) => {
      return dispatch(deleteBookmarkSuccess(bookmark));
    }).catch((error) => {
      return dispatch(deleteBookmarkError(error));
    });
  };
}

/* FOLDER ACTIONS */
// Get Requests
function getFoldersSuccess(folders) {
  return {
    folders,
    type: actionTypes.GET_FOLDERS_SUCCESS,
  };
}

function getFoldersError(error) {
  return {
    error,
    type: actionTypes.GET_FOLDERS_ERROR,
  };
}

function getFolders(token) {
  console.log('token -> ', token)
  return (dispatch) => {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = 'http://localhost:5000/folders';
    const newFetch = fetchHelp(url, init);

    newFetch.then((folders) => {
      return dispatch(
        getFoldersSuccess(folders)
      );
    }).catch((error) => {
      return dispatch(
        getFoldersError(error)
      );
    });
  };
}

// Post Requests
function addFolderSuccess(newFolderName) {
  return {
    type: actionTypes.ADD_FOLDER_SUCCESS,
    folder: newFolderName,
  };
}

function addFolderError(error) {
  return {
    error,
    type: actionTypes.ADD_FOLDER_ERROR,
  };
}

function addFolder(newFolder, token) {
  return (dispatch) => {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        foldername: newFolder,
      }),
    };

    const url = 'http://localhost:5000/folders';
    const newFetch = fetchHelp(url, init);

    newFetch.then((folder) => {
      return dispatch(addFolderSuccess(folder));
    }).catch((error) => {
      return dispatch(addFolderError(error));
    });
  };
}

// Put Requests
function editFolderSuccess(editedFolder) {
  return {
    type: actionTypes.EDIT_FOLDER_SUCCESS,
    folder: editedFolder,
  };
}

function editFolderError(error) {
  return {
    error,
    type: actionTypes.EDIT_FOLDER_ERROR,
  };
}

function editFolder(folderId, folderName, token) {
  return (dispatch) => {
    const folder = {
      folderid: folderId,
      foldername: folderName,
    };

    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(folder),
    };
    const url = `http://localhost:5000/folders/${folderId}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((editedFolder) => {
      dispatch(editFolderSuccess(editedFolder));
    }).catch((error) => {
      dispatch(editFolderError(error));
    });
  };
}

// Delete Requests
function deleteFolderSuccess(deletedFolder) {
  return {
    type: actionTypes.DELETE_FOLDER_SUCCESS,
    folder: deletedFolder,
  };
}

function deleteFolderError(error) {
  return {
    error,
    type: actionTypes.DELETE_FOLDER_ERROR,
  };
}

function deleteFolder(folderid, token) {
  return (dispatch) => {
    const init = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `http://localhost:5000/folders/${folderid}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((folder) => {
      return dispatch(deleteFolderSuccess(folder));
    }).catch((error) => {
      return dispatch(deleteFolderError(error));
    });
  };
}

/* TAGS ACTIONS */
// Get Requests

function getTagsSuccess(tags) {
  return {
    tags,
    type: actionTypes.GET_TAGS_SUCCESS,
  };
}

function getTagsError(error) {
  return {
    error,
    type: actionTypes.GET_TAGS_ERROR,
  };
}

function getTags(token) {
  return (dispatch) => {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = 'http://localhost:5000/';
    const newFetch = fetchHelp(url, init);

    newFetch.then((tags) => {
      return dispatch(
        getTagsSuccess(tags)
      );
    }).catch((error) => {
      return dispatch(
        getTagsError(error)
      );
    });
  };
}

function findBookmarksSuccess(bookmarks) {
  return {
    bookmarks,
    type: actionTypes.FIND_BOOKMARKS_SUCCESS,
  };
}

function findBookmarksError(error) {
  return {
    error,
    type: actionTypes.FIND_BOOKMARKS_ERROR,
  };
}

function findBookmarks(tag, token) {
  return (dispatch) => {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `http://localhost:5000/bookmarks/${tag.id}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmarks) => {
      return dispatch(
        findBookmarksSuccess(bookmarks)
      );
    }).catch((err) => {
      return dispatch(
        findBookmarksError(err)
      );
    });
  };
}


exports.logout = logout;
exports.loginSuccess = loginSuccess;
exports.loginError = loginError;
exports.searchTextChange = searchTextChange;
exports.addBookmark = addBookmark;
exports.addFolder = addFolder;
exports.getBookmarks = getBookmarks;
exports.getFolders = getFolders;
exports.getTags = getTags;
exports.editBookmark = editBookmark;
exports.editFolder = editFolder;
exports.deleteBookmark = deleteBookmark;
exports.deleteFolder = deleteFolder;
exports.getTags = getTags;
exports.findBookmarks = findBookmarks;
