# RESTful API for Book-Kit

## Overview

RESTful API using NodeJS, Express, and Postgres. The API serves information for the Book-Kit project.

## Database

### Schema

![Schema](documentation/diagrams/bookmark_database_schema_sep28_16.png)

## Endpoints

All endpoints use JWT authentication.

### Bookmarks

#### GET /bookmarks

- _Description:_ Returns an array of all the bookmarks associated with an authenticated user. A bookmark record normally consist of an id, url, title, description, a folder id, and a customer id (i.e. the owner/creator of a bookmark). For the connivence of the front-end, the endpoint also returns the folder name, an array of all users with access to the bookmark, and a list of tags. If the user doesn't exit in the database, they are added and an empty array is returned.
- _Endpoint:_ `/bookmarks`
- _Example:_

```json
> GET /bookmarks

Status: 200 OK
[
  { "bookmarkid": 39,
    "url": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
    "title": "A Complete Guide to Flexbox",
    "description": "A quick reference Flex.",
    "foldername": "fewd",
    "folderid": 8,
    "screenshot": "https://css-tricks.com/wp-content/uploads/2014/05/flex-container.svg",
    "owner": "12989643",
    "members": ["12989643"],
    "tags": [
      { "tagid": 16,
        "tagname": "reference"
      }
    ]
  }
]
```

#### POST /bookmarks

- _Description:_ Inserts a bookmark into the database and associates it with a folder and tag(s). The bookmark is automatically assigned to the authenticated customer. If insertion into database is successful, then the new bookmark plus tags are returned to the caller.
- _Endpoint:_ `/bookmark`
- _Data Parameters:_ An object with the following fields: url, title, description (optional), folderid, foldername, screenshot (optional), and an array of tags (optional).

- _Example request:_

```json
> POST /bookmark
> {
>   "url": "https://webdesign.tutsplus.com/articles/designing-for-and-as-a-color-blind-person--webdesign-3408",
>   "title": "Designing For, and As, a Color-Blind Person",
>   "description": "Be careful about color combinations.",
>   "screenshot": "https://cdn.tutsplus.com/webdesign/uploads/legacy/articles/003_colorBlind/colortest.png",
>   "folderid": "8",
>   "foldername": "fewd",
>   "tags": ["a11y"]
> }

Status: 201 Created
{
  "url": "https://webdesign.tutsplus.com/articles/designing-for-and-as-a-color-blind-person--webdesign-3408",
  "title": "Designing For, and As, a Color-Blind Person",
  "description": "Be careful about color combinations.",
  "folderid": 8,
  "screenshot": "https://cdn.tutsplus.com/webdesign/uploads/legacy/articles/003_colorBlind/colortest.png",
  "bookmarkid": 40,
  "customerid": "12989646",
  "foldername": "fewd",
  "tags": [
    {
      "tagid": 17,
      "tagname": "a11y"
    }
  ]
}
```

#### PUT /bookmarks/:bookmarkid

- _Description:_ Updates a bookmark and it's associations in the database. If the update is successful, then the edited bookmark is returned to the caller.
- _Endpoint:_ `/bookmarks/:bookmarkid`
- _Data Parameters:_ An object with the following fields: url, title, description (optional), folderid, foldername, screenshot (optional), and an array of tags.
- _Example Request:_

```json
PUT /bookmark/40
{
  "url": "https://webdesign.tutsplus.com/articles/designing-for-and-as-a-color-blind-person--webdesign-3408",
  "title": "Designing For, and As, a Color-Blind Person",
  "description": "Be careful about color combinations.",
  "screenshot": "https://cdn.tutsplus.com/webdesign/uploads/legacy/articles/003_colorBlind/colortest.png",
  "bookmarkid": 40,
  "folderid": "8",
  "foldername": "fewd",
  "tags": ["a11y","color"]
}

Status: 200 Ok
{
  "url": "https://webdesign.tutsplus.com/articles/designing-for-and-as-a-color-blind-person--webdesign-3408",
  "title": "Designing For, and As, a Color-Blind Person",
  "description": "Be careful about color combinations.",
  "folderid": 8,
  "screenshot": "https://cdn.tutsplus.com/webdesign/uploads/legacy/articles/003_colorBlind/colortest.png",
  "bookmarkid": 40,
  "customerid": "12989646",
  "foldername":"fewd",
  "tags": [
    {
      "tagid": 17,
      "tagname": "a11y"
    },
    {
      "tagid": 18,
      "tagname": "color"
    }
  ]
}
```

#### DELETE /bookmarks/:bookmarkid

- _Description:_ Deletes the bookmark with the specified id. Deleting a bookmark does not remove a tags or folders. If deleting from the database is successful, then the deleted bookmark is returned to the caller.
- _Endpoint:_ `/bookmarks/:bookmarkid`
- _Example Request:_

```json

> DELETE /bookmarks/:bookmarkid

Status: 200 ok
{
  "url": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
  "title": "A Complete Guide to Flexbox",
  "description": "A quick reference for Flex.",
  "folderid": 8,
  "screenshot": "https://css-tricks.com/wp-content/uploads/2014/05/flex-container.svg",
  "bookmarkid": 39,
  "customerid": "12989646"
}
`
```

#### GET /folders

- _Description:_ Returns an array of folders stored in the database.
- _Endpoint:_ `/folders`
- _Example:_

```json
> GET /folders

Status: 200 OK
[
  "Work",
  "Personal",
  "thinkful",
  "js",
  "test1"
]
`
```

### GET /folder/bookmarks/:folderName

- _Description:_ Returns an array of bookmarks with the provided folder name.
- _Endpoint:_ `/folder/bookmarks/:folderName`
- _Example:_

```json
> GET /folder/bookmarks/Work

Status: 200 OK
[
  {
    "bookmarkid": 3,
    "url": "https://trello.com/b/3Uj9v7Oq/full-stack-bookmarks-unnamed",
    "title": "Trello Board",
    "description": "The bookmark board project managment tool.",
    "foldername": "Work",
    "screenshot": "https://i.kinja-img.com/gawker-media/image/upload/s--mWjnesG_--/18ixcsrp44y9gjpg.jpg"
  },
  {
    "bookmarkid": 6,
    "url": "http://redux.js.org/docs/basics/Actions.html",
    "title": "Redux Actions",
    "description": "How to create an action in Redux.",
    "foldername": "Work",
    "screenshot": "https://image.slidesharecdn.com/reactreduxintroduction-151124165017-lva1-app6891/95/react-redux-introduction-33-638.jpg?cb=1448383914"
  }
]
```

### GET /tags

- _Description:_ Returns an array of tags stored in the database.
- _Endpoint:_ `/tags`
- _Example:_

```json
> GET /tags

Status: 200 OK
[
  "Project-Managment",
  "Thinkful",
  "Redux"
]
```

### GET /tag/bookmarks/:tagName

- _Description:_ Returns an array of bookmarks with the provided tag name.
- _Endpoint:_ `/tag/bookmarks/:tagName`
- _Example:_

```json
> GET /tag/bookmarks/Thinkful

Status: 200 OK
[
  {
    "bookmarkid": 6,
    "url": "http://redux.js.org/docs/basics/Actions.html",
    "title": "Redux Actions",
    "description": "How to create an action in Redux.",
    "foldername": "Work",
    "screenshot": "https://image.slidesharecdn.com/reactreduxintroduction-151124165017-lva1-app6891/95/react-redux-introduction-33-638.jpg?cb=1448383914",
    "tag": "Thinkful"
  },
  {
    "bookmarkid": 6,
    "url": "http://redux.js.org/docs/basics/Actions.html",
    "title": "Redux Actions",
    "description": "How to create an action in Redux.",
    "foldername": "Work",
    "screenshot": "https://image.slidesharecdn.com/reactreduxintroduction-151124165017-lva1-app6891/95/react-redux-introduction-33-638.jpg?cb=1448383914",
    "tag": "Redux"
  }
]
```

### POST /folder

- _Description:_ Takes an object with the following field: foldername. If insert into database is successful, then the new folder name is returned to the caller.
- _Endpoint:_ `/bookmark`
- _Data Parameters:_

  - A folder to add wrapped in an object

- _Example request:_

```json
POST /bookmark
{
  "foldername": "Coding"
}

Status: 201 Created
{
  "foldername": "Coding"
}
```
