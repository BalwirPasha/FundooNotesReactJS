import React, { Component } from 'react';
import Notetemplate from './Notetemplate';
import { headerJsonWithToken, get } from '../../services/HttpService';

class Trash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawNotes: [],
      notes: []
    };
    this.notetemplate = [];
  }

  toggleListView = () => {
    this.notetemplate.forEach(notetemplate => {
      notetemplate.toggleListView();
    });
  }

  componentDidMount() {
    this.getAllNotes();
  }

  getAllNotes = () => {
    const header = headerJsonWithToken();
    get('http://localhost:8080/note/getallnotes', header)
      .then(res => {
        this.setState({
          rawNotes: res.data,
          notes: res.data.filter(note => (note.trashed)).map((note, index) => {
            return <Notetemplate ref={notetemplate => this.notetemplate[index] = notetemplate} key={note.noteId}
              note={note} index={index} noteDeleted={this.noteDeleted} />
            // notes: res.data.map((note, index) => {
            //   return <Notetemplate ref={notetemplate => this.notetemplate[index] = notetemplate} key={note.noteId}
            //     note={note} index={index} noteDeleted={this.noteDeleted}/>
          })
        });
      })
      .catch(res => {
        console.log(res.response);
      });
  }

  noteDeleted = (note) => {
    this.setState({
      notes: this.state.notes.filter(noteView => (parseInt(noteView.key, 10) !== note.noteId))
    })
  }

  render() {
    return (
      <div>
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

export default Trash;
