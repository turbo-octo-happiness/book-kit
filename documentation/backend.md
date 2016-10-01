# Bookmarks API for the [**Book Kit**](https://github.com/robbykim/bookmarks-fullstack) project

## Overview

RESTful API using NodeJS, Express, and Postgres. The API serves information for the Book-Kit project.

## Database

### Schema

![Schema](documentation/diagrams/bookmark_database_schema_sep28_16.png)

## API endpoints

### GET /bookmarks

- _Description:_ Returns an array of all the bookmarks stored in the database.
- _Endpoint:_ `/bookmarks`
- _Example:_

```json
> GET /bookmarks

Status: 200 OK
[
  {
    "bookmarkid": 1,
    "url": "test.com",
    "title": "test bookmark for sierra",
    "description": "test des",
    "foldername": "Work",
    "folderid": 1,
    "screenshot": "test.png",
    "owner": "12989626",
    "members": [
      "12989626",
      "ab242cd"
    ],
    "tags": [
      {
        "id": "1",
        "tag": "test tag 1 for 1"
      },
      {
        "id": "2",
        "tag": "test tag 2 for 1"
      }
    ]
  }
]
```

### GET /folders

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

### POST /bookmark

- _Description:_ Takes an object with the following fields: url, title, description (optional), foldername, screenshot (optional). If insert into database successful, then the new bookmark is returned to the caller.
- _Endpoint:_ `/bookmark`
- _Data Parameters:_

  - A bookmark to add

- _Example request:_

```json
POST /bookmark
{
  "url": "http://redux.js.org/docs/basics/Actions.html",
  "title": "Redux Actions",
  "description": "How to create an action in Redux.",
  "foldername": "Work",
  "screenshot": "https://image.slidesharecdn.com/reactreduxintroduction-151124165017-lva1-app6891/95/react-redux-introduction-33-638.jpg?cb=1448383914",
  "tag": "Redux"
}

Status: 201 Created
{
  "bookmarkid": 6,
  "url": "http://redux.js.org/docs/basics/Actions.html",
  "title": "Redux Actions",
  "description": "How to create an action in Redux.",
  "foldername": "Work",
  "screenshot": "https://image.slidesharecdn.com/reactreduxintroduction-151124165017-lva1-app6891/95/react-redux-introduction-33-638.jpg?cb=1448383914",
  "tag": "Redux"
}
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
