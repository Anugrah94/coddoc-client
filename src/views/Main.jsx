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
      doc: ''
    }
  }

  componentDidMount() {
    if(userStore.loginStatus === false) {
      this.props.history.push('/')
    } else {
      userStore.resetAll()
    }
  };

  getData = (e) => {
    this.setState({
      input: e
    })
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <div className="boxSnippet">
          <div className="smallBoxLeft">
            <AceEditor
              className="forInput"
              mode="javascript"
              onChange={this.getData}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.input}
              height='370px'
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
            value={this.state.input}>
          </TextareaAutosize>
        </div>
      </div>
    );
  };
};
