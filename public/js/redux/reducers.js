import { combineReducers } from 'redux';
import actionTypes from './constants';

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
        if (value.bookmarkid === action.bookmark[0].bookmarkid) {
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
      return state;
    }

    default: {
      return state;
    }
  }
}

function tagReducer(state = [], action) {
  // This part of the state is an array
  switch (action.type) {
    case actionTypes.GET_TAGS_SUCCESS: {
      return action.tags;
    }
    case actionTypes.GET_TAGS_ERROR: {
      return state;
    }
    default: {
      return state;
    }
  }
}

const rootReducer = combineReducers({
  bookmarks: bookmarkReducer,
  folders: folderReducer,
  tags: tagReducer,
  search: searchReducer,
});

exports.rootReducer = rootReducer;
