import React, { Component } from 'react';
import Createnote from './CreateNote';

class Label extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rawNotes: [],
      notes: []
    };
  }

  componentDidMount(){

  }

  toggleListView = () => {
    // this.notetemplate.forEach(notetemplate => {
    //   notetemplate.toggleListView();
    // });
  }

  getAllNotes = () => {
    //noteArr will have all notes

    // this.noteArr = this.noteArr.filter(note => {
    //   let bool = false;
    //   note.labels.forEach(lab => {
    //     if(lab.labelName === labelName)
    //       bool = true
    //   })
    //   return bool;
    // })
  }

  render() {
    console.log(this.props.loc.pathname);
    
    return (
      <div>
        <Createnote noteCreated={this.noteCreated} />
        <div>
          <h2>This is test attempt to check dashboard's response w.r.t sidebar toggle.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div>
            <h1>Label Label Label Label Label Label Label Label </h1>
            <h1>Label Label Label Label Label Label Label Label </h1>
            <h1>Label Label Label Label Label Label Label Label </h1>
            <h1>Label Label Label Label Label Label Label Label </h1>
            <h1>Label Label Label Label Label Label Label Label </h1>
            <h1>Label Label Label Label Label Label Label Label </h1>
            <h1>Label Label Label Label Label Label Label Label </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Label;