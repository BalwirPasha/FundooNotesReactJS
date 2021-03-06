import React, { Component } from 'react';
import Notetemplate from '../Notes/Notetemplate';
import Notes from '../Notes/Notes';
import Archive from '../Notes/Archive';
import Trash from '../Notes/Trash';
import Label from '../Notes/Label';
import { get, headerJsonWithToken } from '../../services/HttpService';
import { Route } from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      allNotes: [],
      isSidebarOpen: true
    };
    this.notetemplate = [];
  }

  toggleCss = () => {
    // Object.entries(this.refs).forEach(([key, value]) => {
    //   if (value.refs.routechild !== undefined)
    //     value.refs.routechild.toggleSidebar();
    // });
    //this.routechild.toggleSidebar();
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    })
  }

  toggleListView = () => {
    // Object.entries(this.refs).forEach(([key, value]) => {
    //   if (value.refs.routechild !== undefined)
    //     value.refs.routechild.toggleListView();
    // });
    this.routechild.toggleListView();
  }

  componentDidMount() {
    //this.getAllNotes();
  }

  getAllNotes = () => {
    const header = headerJsonWithToken();
    get('http://localhost:8080/note/getallnotes', header)
      .then(res => {
        this.setState({
          allNotes: res.data,
          notes: res.data.map((note, index) => {
            return <Notetemplate ref={notetemplate => this.notetemplate[index] = notetemplate} key={note.noteId}
              note={note} index={index} noteDeleted={this.noteDeleted} />
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
    notesArr.push(<Notetemplate ref={notetemplate => this.notetemplate.push(notetemplate)} key={note.noteId}
      note={note} index={this.state.notes.length} noteDeleted={this.noteDeleted} />)
    this.setState({
      notes: notesArr
    })
  }

  noteDeleted = (index) => {
    console.log(index);
    let notesArr = this.state.allNotes;
    notesArr.splice(index, 1);
    console.log(notesArr);
    this.setState({
      allNotes: notesArr,
      notes: notesArr.map((note, index) => {
        return <Notetemplate ref={notetemplate => this.notetemplate[index] = notetemplate} key={note.noteId}
          note={note} index={index} noteDeleted={this.noteDeleted} />
      })
    })
  }

  render() {
    console.log(this.props);
    return (
      <div className={this.state.isSidebarOpen ? "Dash-with-side" : "Dash-wo-side"}>
        <Route exact path={this.props.dash.match.path} render={() => <Notes ref={routechild => this.routechild = routechild} />}></Route>
        <Route path={`${this.props.dash.match.path}/archive`} render={() => <Archive ref={routechild => this.routechild = routechild} />}></Route>
        <Route path={`${this.props.dash.match.path}/trash`} render={() => <Trash ref={routechild => this.routechild = routechild} />}></Route>
        <Route path={`${this.props.dash.match.path}/label`} render={() => <Label ref={routechild => this.routechild = routechild} loc={this.props.dash.location}/>}></Route>

        {/* <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {this.state.notes}
        </div> */}
      </div>
    );
  }
}

export default Dashboard;