/* Folder Management originally from Navbar */

  onAddInput(event) {
    const text = event.target.value;
    this.props.dispatch(actions.searchTextChange(text));
  }

  addFolder(folder) {
    this.props.dispatch(actions.addFolder(folder));
  }

  render() {
    return (
      <Navbar
        folders={this.props.folders}
        onAddInput={this.onAddInput}
        addFolder={this.addFolder}
      />
    );
  }


  onAddFolder(event) {
    event.preventDefault();
    this.props.addFolder(this.newFolder.value);
    this.newFolder.value = '';
  }

  render() {
    const folderArr = [];
    this.props.folders.forEach((folder, index) => {
      folderArr.push(<Folder key={index} folder={folder} />);
    });

            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Folders <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <form onSubmit={this.onAddFolder}>
                      <input
                        className="form-control"
                        placeholder="Add Folder"
                        type="text"
                        ref={newFolder => { this.newFolder = newFolder; }}
                      />
                    </form>
                  </li>
                  {folderArr}
                </ul>
              </li>
            </ul>



/* Search box originally from Navbar */

            <form className="navbar-form navbar-right">
              <div className="form-group">
                <input
                  type="text"
                  onChange={this.props.onAddInput}
                  placeholder="Search..."
                  className="search-bar form-control"
                />
              </div>
            </form>
