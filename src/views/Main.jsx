import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
// import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

import './Page.css';

import NavBar from '../components/NavBar';
import userStore from '../store/user';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      snippet: '',
      doc: `function namafunc(param1, param2){\nvar a = 'haha'\nfor(number in 5),{\nif(condition && condition || condition === true || condition === false || !condition && condition === undefined && condition === null),{\ncode}else if(condition),{\nwhile(a > b),{console.log(code)\narray.push(item)} //ini code\ndelete item}}}`,
      toTranslate: ''
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    if(token) {
      userStore.logIn()
    } else {
      userStore.resetAll()
    }
  };

  getData = (e) => {
    this.setState({
      input: e
    })
  }

  convertData = () => {
    this.setState({
      snippet: 'loading...',
      doc: 'loading...'
    })
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <div className="boxSnippet">
          <div className="smallBoxLeft">
            <div className="topBar">
              <p
                className="buttonToConvert"
                onClick={() => this.convertData()}>
                <i class="fas fa-play-circle"></i>
                &nbsp;&nbsp;Convert
              </p>
            </div>
            <AceEditor
              className="forInput"
              mode="javascript"
              onChange={this.getData}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.input}
              height='330px'
              width='620vr'
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}/>
          </div>
          <div className="midBox"></div>
          <div className="smallBoxRight">
            <TextareaAutosize
              className="forOutput"
              type="text"
              placeholder="result..."
              style={{ maxHeight: 360 }}
              value={this.state.snippet}>
            </TextareaAutosize>
          </div>
        </div>
        <div className="bottomBox">
          <TextareaAutosize
            className="forDoc"
            type="text"
            placeholder="doc..."
            style={{ maxHeight: 150 }}
            value={this.state.doc}>
          </TextareaAutosize>
        </div>
      </div>
    );
  };
};
