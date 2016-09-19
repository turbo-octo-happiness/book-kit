/* Redux Action Names */
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';

/* POST HTTP requests */
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS'; // '/bookmark'
export const ADD_BOOKMARK_ERROR = 'ADD_BOOKMARK_ERROR';
export const ADD_FOLDER_SUCCESS = 'ADD_FOLDER_SUCCESS'; // '/folder'
export const ADD_FOLDER_ERROR = 'ADD_FOLDER_ERROR';

/* GET HTTP requests */
export const GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS'; // '/bookmarks'
export const GET_BOOKMARKS_ERROR = 'GET_BOOKMARKS_ERROR';
export const GET_FOLDERS_SUCCESS = 'GET_FOLDERS_SUCCESS'; // '/folders'
export const GET_FOLDERS_ERROR = 'GET_FOLDERS_ERROR';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS'; // '/tags'
export const GET_TAGS_ERROR = 'GET_TAGS_ERROR';

/* PUT HTTP requests */
export const EDIT_BOOKMARK_SUCCESS = 'EDIT_BOOKMARK_SUCCESS'; // '/bookmark/:id'
export const EDIT_BOOKMARK_ERROR = 'EDIT_BOOKMARK_ERROR';
export const EDIT_FOLDER_SUCCESS = 'EDIT_FOLDER_SUCCESS'; // '/bookmark/:id'
export const EDIT_FOLDER_ERROR = 'EDIT_FOLDER_ERROR';

/* DELETE HTTP requests */
export const DELETE_BOOKMARK_SUCCESS = 'DELETE_BOOKMARK_SUCCESS'; // '/bookmark/:id'
export const DELETE_BOOKMARK_ERROR = 'DELETE_BOOKMARK_ERROR';
export const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS'; // '/bookmark/:id'
export const DELETE_FOLDER_ERROR = 'DELETE_FOLDER_ERROR';
