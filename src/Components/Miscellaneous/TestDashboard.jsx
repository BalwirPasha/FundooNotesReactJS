import React, { Component } from 'react';
import Createnote from '../Notes/CreateNote';
import Notetemplate from '../Notes/Notetemplate';
import { get, headerJsonWithToken } from '../../services/HttpService';

class TestDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
      notes: []
    };
    this.notetemplate = [];
  }

  toggleCss = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
  }

  toggleListView = () => {
    this.notetemplate.forEach(notetemplate => {
      notetemplate.toggleListView();
    });
  }

  componentDidMount() {
    get('http://localhost:8080/note/getallnotes', headerJsonWithToken)
      .then(res => {
        this.setState({
          notes: res.data.map((note, index) => {
            return <Notetemplate ref={notetemplate => this.notetemplate[index] = notetemplate} key={note.noteId} note={note} />
          })
        });
      })
      .catch(res => {
        console.log(res.response);
      });
  }

  noteCreated = (note) => {
    console.log(note);
    let notesArr = this.state.notes;
    notesArr.push(<Notetemplate ref={notetemplate => this.notetemplate.push(notetemplate)} key={note.noteId} note={note} />)
    this.setState({
      notes: notesArr
    })
  }

  render() {
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

export default TestDashboard;