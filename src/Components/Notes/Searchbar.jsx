import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class Searchbar extends Component {
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
          style={{ padding: '10px', width:'100%' }}
        >
        </Input>
      </div>
    );
  }
}

export default Searchbar;
