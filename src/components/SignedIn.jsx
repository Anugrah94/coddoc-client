import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
// import brace from 'brace';
import AceEditor from 'react-ace';
import { Mutation } from 'react-apollo';

import 'brace/mode/java';
import 'brace/theme/github';

import '../views/Page.css';

import { pythonjs, functionDetection, scrapping } from '../store/convert'

export default class SignedIn extends Component {
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
    let output = pythonjs(this.state.input)
    let scrap = scrapping(this.state.input)
    console.log(scrap)
    this.setState({
      snippet: output
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
                <i className="fas fa-play-circle"></i>
                &nbsp;&nbsp;Convert
              </p>
            </div>
            {/* <Mutation>
              <div>
                <form> */}
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
                    height='315px'
                    width='620vr'
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                    }}/>
                {/* </form>
              </div>
            </Mutation> */}
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
      </div>
    );
  };
};
