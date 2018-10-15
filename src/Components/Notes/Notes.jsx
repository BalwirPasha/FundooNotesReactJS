import React, { Component } from 'react';
import Createnote from './CreateNote';
import Notetemplate from './Notetemplate';
import { headerJsonWithToken, get } from '../../services/HttpService';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawNotes: [],
      notes: []
    };
    this.notetemplate = [];
    console.log('notes');    
  }

  componentDidMount() {
    this.getAllNotes();
  }

  toggleListView = () => {
    this.notetemplate.forEach(notetemplate => {
      notetemplate.toggleListView();
    });
  }

  getAllNotes = () => {
    const header = headerJsonWithToken();
    get('http://localhost:8080/note/getallnotes', header)
      .then(res => {
        this.setState({
          rawNotes: res.data,
          notes: res.data.filter(note => (!note.trashed && !note.archived)).map((note, index) => {
              return <Notetemplate ref={notetemplate => this.notetemplate[index] = notetemplate} key={note.noteId}
                note={note} index={note.noteId} noteDeleted={this.noteDeleted} noteCreated={this.noteCreated}/>
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

  noteCreated = (note) => {
    let notesArr = this.state.notes;
    notesArr.unshift(<Notetemplate ref={notetemplate => this.notetemplate.push(notetemplate)} key={note.noteId}
      note={note} index={note.noteId} noteDeleted={this.noteDeleted} noteCreated={this.noteCreated}/>)
    this.setState({
      notes: notesArr
    })
  }

  noteDeleted = (note) => {
    this.setState({
      notes: this.state.notes.filter(noteView => (parseInt(noteView.key, 10) !== note.noteId))
    })
  }

  render() {
    return (
      <div>
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
