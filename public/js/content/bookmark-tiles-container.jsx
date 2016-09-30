import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BookmarkTiles from './bookmark-tiles';
import Tile from './bookmark-tiles-child';

const propTypes = {
  params: PropTypes.object,
  bookmarks: PropTypes.array,
  search: PropTypes.string,
};

function BookmarkTilesContainer(props) {
  let tileArr = [];
  // FIXME: need to make it so we're routing to folderid and not name
  // folders with spaces show up with space in url which is bad
  // nav-child-folder and routes - folderId is not stored with bookmarks
  if (props.params.folderId) {
    const folder = props.params.folderId;
    const tempArr = props.bookmarks.filter((bookmark) => {
      return parseInt(folder) === bookmark.folderid;
    });

    tempArr.forEach((bookmark) => {
      tileArr.push(<Tile
        key={bookmark.bookmarkid}
        title={bookmark.title}
        id={bookmark.bookmarkid}
        screenshot={bookmark.screenshot}
      />);
    });
  } else if (props.params.tagId) {
    const tagId = props.params.tagId;
    const arr = [];
    // TODO: Fix tempArr so that it contains the bookmarks instead of arr
    const tempArr = props.bookmarks.filter((bookmark) => {
      if (bookmark.tags) {
        bookmark.tags.map((tag) => {
          // To shut up ESLint: Informing parseInt that it's parsing with base 10 radix
          if (parseInt(tagId, 10) === tag.id) {
            arr.push(bookmark);
            return true;
          }
          return false;
        });
      }
      return false;
    });
    // TODO: Once tempArr is fixed to have bookmarks array, replace arr
    arr.forEach((bookmark) => {
      tileArr.push(<Tile
        key={bookmark.bookmarkid}
        title={bookmark.title}
        id={bookmark.bookmarkid}
        screenshot={bookmark.screenshot}
      />);
    });
  } else if (props.search) {
    const search = new RegExp(props.search);
    const tempArr = props.bookmarks.filter((bookmark) => {
      if (bookmark.title.toLowerCase().match(search)) {
        return true;
      }

      return false;
    });

    tempArr.forEach((bookmark) => {
      tileArr.push(<Tile
        key={bookmark.bookmarkid}
        title={bookmark.title}
        id={bookmark.bookmarkid}
        screenshot={bookmark.screenshot}
      />);
    });
  } else {
    // Makes an array of Tile components to be displayed
    props.bookmarks.forEach((bookmark) => {
      tileArr.push(<Tile
        key={bookmark.bookmarkid}
        title={bookmark.title}
        id={bookmark.bookmarkid}
        screenshot={bookmark.screenshot}
      />);
    });
  }

  if (props.params.folderName && props.search) {
    const search = new RegExp(props.search);
    const tempArr = tileArr.filter((bookmark) => {
      if (bookmark.props.title.toLowerCase().match(search)) {
        return true;
      }

      return false;
    });

    tileArr = [];
    tempArr.forEach((bookmark) => {
      tileArr.push(<Tile
        key={bookmark.props.id}
        title={bookmark.props.title}
        id={bookmark.props.id}
        screenshot={bookmark.props.screenshot}
      />);
    });
  }

  return (
    <BookmarkTiles
      tileArr={tileArr}
    />
  );
}

const mapStateToProps = state => {
  return {
    bookmarks: state.bookmarks,
    search: state.search,
  };
};

BookmarkTilesContainer.propTypes = propTypes;

const Container = connect(mapStateToProps)(BookmarkTilesContainer);

module.exports = Container;
