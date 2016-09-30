import { combineReducers } from 'redux';
import jwtDecode from 'jwt-decode';
import actionTypes from './constants';

function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      localStorage.setItem('idToken', action.token);
      localStorage.setItem('profile', JSON.stringify(action.profile));

      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile,
        token: action.token,
        error: '',
      });
    }

    case actionTypes.LOGIN_ERROR: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        error: action.error,
      });
    }

    case actionTypes.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
      });
    }

    default: {
      return state;
    }
  }
}

function searchReducer(state = '', action) {
  switch (action.type) {
    case actionTypes.SEARCH_TEXT_CHANGE: {
      return action.text;
    }

    default: {
      return state;
    }
  }
}

function bookmarkReducer(state = [], action) {
  let index;

  switch (action.type) {
    case actionTypes.ADD_BOOKMARK_SUCCESS: {
      const tempArr = state.slice();
      console.log(action.bookmark, '<==new bookmark in reducer');
      tempArr.unshift(action.bookmark);
      return tempArr;
    }

    case actionTypes.GET_BOOKMARKS_SUCCESS: {
      return action.bookmarks;
    }

    case actionTypes.EDIT_BOOKMARK_SUCCESS: {
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.bookmarkid === action.bookmark.bookmarkid) {
          index = i;
        }
      });

      tempArr[index] = action.bookmark;
      return tempArr;
    }

    case actionTypes.DELETE_BOOKMARK_SUCCESS: {
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.bookmarkid === action.bookmark.bookmarkid) {
          index = i;
        }
      });

      tempArr.splice(index, 1);
      return tempArr;
    }

    case actionTypes.ADD_BOOKMARK_ERROR:
    case actionTypes.GET_BOOKMARKS_ERROR:
    case actionTypes.EDIT_BOOKMARK_ERROR:
    case actionTypes.DELETE_BOOKMARK_ERROR: {
      return state;
    }

    default: {
      return state;
    }
  }
}

function folderReducer(state = [], action) {
  // This part of the state is an array
  let index;
  switch (action.type) {
    case actionTypes.ADD_FOLDER_SUCCESS: {
      const newState = state.slice();
      newState.push(action.folder);
      return newState;
    }

    case actionTypes.GET_FOLDERS_SUCCESS: {
      return action.folders;
    }

    case actionTypes.EDIT_FOLDER_SUCCESS: {
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.folderid === action.folder.folderid) {
          index = i;
        }
      });

      tempArr[index] = action.folder;
      return tempArr;
    }

    case actionTypes.DELETE_FOLDER_SUCCESS: {
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.folderid === action.folder[0].folderid) {
          index = i;
        }
      });

      tempArr.splice(index, 1);
      return tempArr;
    }

    case actionTypes.ADD_FOLDER_ERROR:
    case actionTypes.GET_FOLDERS_ERROR:
    case actionTypes.EDIT_FOLDER_ERROR:
    case actionTypes.DELETE_FOLDER_ERROR: {
      console.log(action.error,'<<<< Reducers/ delete folder error')
      return state;
    }

    default: {
      return state;
    }
  }
}

function tagReducer(state = [], action) {
  // This part of the state is an array
  let index;
  switch (action.type) {
    case actionTypes.ADD_BOOKMARK_SUCCESS: {
      const tempArr = state.slice();
      console.log('new tags====>', action.tags);
      action.tags.forEach((tag) => {
        tempArr.push(tag);
      });
      console.log('new tag state===>', tempArr);
      return tempArr;
    }
    case actionTypes.GET_TAGS_SUCCESS: {
      console.log(action.tags, '<=== action.tags');
      return action.tags;
    }
    case actionTypes.EDIT_TAG_SUCCESS: {
      console.log(action.tag, '<<<< Reducer/ updated tag');
      console.log(state, '<<<< tag state');
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.tagid === action.tag.tagid) {
          index = i;
        }
      });

      tempArr[index] = action.tag;
      return tempArr;
    }
    case actionTypes.DELETE_TAG_SUCCESS: {
      console.log(action.tagid, '<<<< Reducers/ deleted tag id');
      return state
    }


    case actionTypes.GET_TAGS_ERROR: {
      return state;
    }
    case actionTypes.FIND_BOOKMARKS_SUCCESS: {
      return action.bookmarks;
    }
    case actionTypes.FIND_BOOKMARKS_ERROR: {
      return state;
    }
    default: {
      return state;
    }
  }
}

const rootReducer = combineReducers({
  auth,
  bookmarks: bookmarkReducer,
  folders: folderReducer,
  tags: tagReducer,
  search: searchReducer,
});

exports.rootReducer = rootReducer;
