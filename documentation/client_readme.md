# Book IT

## Functional Specification

### Overview

The service will provide a means of organizing bookmarks outside of built in browser bookmark functions.

Disclaimer: This project is mainly built for learning purposes and not intended for production use.

### Scenarios

#### Scenario 1:

Sierra and Robby are in a class where all of their bookmarks and resources are gobbled up by Slack. Therefore Sierra and Robby need a way to track these learning resources. They have a bookmark folder in their Chrome browser that "save" the resources but are not very descriptive and very hard to sort through. Sierra and Robby go to bookmarkproject.example.com and make accounts in order to organize their resources for later review.

#### Scenario 2:

Chris has a vast collection of cat videos he likes to use for various sarcastic moments. However in his long list of bookmarks, he tends to lose track of them. He even sent an irrelevant cat video to his coworker (gasp). Chris recently signed up for bookmarkproject.com and found that here, he can tag his videos according to their sarcastic purposes.

### Non Goals

This version will not support the following features:

- Multiple Accounts
- Sharing between Accounts
- Cannot automatically grab screenshot from url
- Rich text annotation

### User Experience / Flow

Main Page with folder and tag links displayed on the sidebar. The main nav bar at the top of the screen will contain the add button and the search feature (real-time in 2.0). The add button will display a form (overlay in 2.0) that will take the place of the main content of the page. The form will take in a title, url, description and screenshot url (upload straight in in 2.0). The latest content will be display first in the page in a tiling format.

#### Main page (titled bookmarks):

![wireframe](http://i.imgur.com/qFzT90N.png)

#### Individual bookmark:

![wireframe](http://i.imgur.com/2Da1LIb.png)

#### Adding a bookmark form:

![wireframe](http://i.imgur.com/B8skJYf.png)

### Components

Search Bar - Will be a regular form type field that you have to hit enter in order to search. The tiling of results will be filtered to meet the search bar input. 2.0 will feature real time updating.

Add button - Will render the component to replace the main tiling content in order to fill out information about the new bookmark. 2.0 will feature an overlay rather than replacing content.

Add form - Form will have inputs for url (req), title (req), description, screenshot, folder (req), and tags. And will have an add button.

Side Bar - Will have a list of folders and tags that you can select in order to filter the results based on those folders/tags. You can select only one folder at a time but can select multiple tags at a time. 2.0 will feature a scroll bar.

Add Folder - Will display a text input and be able to add a new folder

Bookmark Tile - Will show url, title, description, screenshot, have options to add tags / add to folder and also to edit/delete options. Tags optional. Folders required. Duplicates not allowed (tiles with duplicate URLs).

Edit Button - Should take the bookmark tile and turn the text fields into input fields available to change.

Folders - You will be able to add new folders on the sidebar

Tags - You will only be able to add new tags while editing/adding a bookmark.

Database is storing:

- url
- title
- descriptions
- tags
- folder
- screenshot (url)
- User (2.0)

## version 1.0

- [x] Enter the bookmark

  - [x] url and title

- [x] Annotations

  - [x] descriptions and etc.

- [x] Folders

  - [x] for organization

- [x] Tagging

  - [x] creating your own tags

- [x] Screenshots

  - [x] uploading screenshots urls to represent the bookmark

- [x] Searching

  - [x] Filtering --- View certain folders/tags by themselves

## version 1.1 (MVP By Friday 9/26)

- [x] User accounts

  - separate set of data per account
  - authentication

- [x] Combine repos

## version 1.2 (MVP By Friday 9/31)

- [ ] Sharing folders between users

  - [ ] Can add bookmarks to shared folder
  - [ ] Cannot edit bookmarks they did not create

- [ ] Add my Account page

  - [ ] Basic Information about user (i.e. name, email, photo)
  - [ ] List Folder with the ability to delete, update, and shared
  - [ ] List of Tags with the ability to delete (i.e. remove tag from all bookmarks) and edit
  - [ ] Change sidebar to be browsing only

## Features we would like to complete by end of capstone

- [ ] Styling

- [ ] Chrome extension

  - Pull info from page
  - example: <http://bookit.thinkful.example/create?url=http%2a%2a%2fetc.etc.etc%2f&title=Example+Bookmark>
  - Separate window or popup window

- [ ] uploading and storing screenshots in the database
