import fetch from 'isomorphic-fetch';
import actionTypes from './constants';

// URL for heroku: https://shrouded-journey-65738.herokuapp.com/
// URL for localhost: https://localhost:5000

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

function getBookmarks() {
  return (dispatch) => {
    const url = 'http://localhost:5000/bookmarks';
    return fetch(url).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      }

      return res.json();
    }).then((bookmarks) => {
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

function addBookmark(newBookmark) {
  return (dispatch) => {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBookmark),
    };

    const url = 'http://localhost:5000/bookmarks';
    fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.reponse = res;
        throw error;
      }

      return res.json();
    }).then((bookmark) => {
      return dispatch(addBookmarkSuccess(bookmark));
    }).catch((error) => {
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

function editBookmark(editedBookmark) {
  return (dispatch) => {
    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBookmark),
    };

    const url = `http://localhost:5000/bookmarks/${editedBookmark.bookmarkid}`;
    fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      }

      return res.json();
    }).then((bookmark) => {
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

function deleteBookmark(bookmarkid) {
  return (dispatch) => {
    const init = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const url = `http://localhost:5000/bookmarks/${bookmarkid}`;
    fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      }

      return res.json();
    }).then((bookmark) => {
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

function getFolders() {
  return (dispatch) => {
    const url = 'http://localhost:5000/folders';
    return fetch(url).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      }

      return res.json();
    }).then((folders) => {
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

function addFolder(newFolder) {
  return (dispatch) => {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        foldername: newFolder,
      }),
    };
    const url = 'http://localhost:5000/folders';
    fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
      return res.json();
    }).then((folder) => {
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

function editFolder(folderId, folderName) {
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
      },
      body: JSON.stringify(folder),
    };
    const url = `http://localhost:5000/folders/${folderId}`;
    fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      }

      return res.json();
    }).then((editedFolder) => {
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

function deleteFolder(folderid) {
  return (dispatch) => {
    const init = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const url = `http://localhost:5000/folders/${folderid}`;
    fetch(url, init).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      }

      return res.json();
    }).then((folder) => {
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

function getTags() {
  // return function(dispatch) {
    // return dispatch(getTagsSuccess(storage.tags));
  // };
}

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
