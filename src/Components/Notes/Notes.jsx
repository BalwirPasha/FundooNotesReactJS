import React, { Component } from 'react';
import Createnote from './CreateNote';
import Notetemplate from './Notetemplate';
import { headerJsonWithToken, get } from '../../services/HttpService';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
      rawNotes: [],
      notes: []
    };
    this.notetemplate = [];
    console.log(props);
  }

  componentDidMount() {
    this.getAllNotes();
  }

  toggleListView = () => {
    this.notetemplate.forEach(notetemplate => {
      notetemplate.toggleListView();
    });
  }

  toggleSidebar = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    })
  }

  filterNotes(note) {
    let index = -1;
    if (note.trashed !== true && note.archived !== true){
      index++;
      return <Notetemplate ref={notetemplate => this.notetemplate[index] = notetemplate} key={note.noteId}
      note={note} index={index} noteDeleted={this.noteDeleted}/>
    };
  }

  getAllNotes = () => {
    const header = headerJsonWithToken();
    get('http://localhost:8080/note/getallnotes', header)
      .then(res => {
        this.setState({
          notes: res.data.filter(this.filterNotes),
          // notes: this.state.rawNotes.map((note, index) => {
          //   return <Notetemplate ref={notetemplate => this.notetemplate[index] = notetemplate} key={note.noteId}
          //     note={note} index={index} noteDeleted={this.noteDeleted}/>
          // })
        });
      })
      .catch(res => {
        console.log(res.response);
      });
  }

  render() {
    console.log(this.state.rawNotes);    
    return (
      <div className={this.state.isSidebarOpen ? "Dash-with-side" : "Dash-wo-side"}>
        <Createnote noteCreated={this.noteCreated} />
        <div>
          <h2>This is test attempt to check dashboard's response w.r.t sidebar toggle.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {this.state.notes}
        </div>
      </div>
    );
  }
}

export default Notes;
