import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
// import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

import '../views/Page.css';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      snippet: '',
      doc: ''
    }
  }

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
              name="input"
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
