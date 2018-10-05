import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="Search-bar">
        <div style={{ padding: '10px', alignSelf: 'center' }}>
          <SearchIcon />
        </div>
        <Input
          disableUnderline
          placeholder="Search..."
          style={{ padding: '10px' }}
        >
        </Input>
      </div>
    );
  }
}

export default Search;
