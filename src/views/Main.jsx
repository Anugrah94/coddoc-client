import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import AceEditor from 'react-ace';
import Modal from 'react-modal';
import { Query } from 'react-apollo';
import brace from 'brace';

import 'brace/mode/java';
import 'brace/theme/github';

import '../views/Page.css';
import NavBar from '../components/NavBar';
import { pythonjs, forScrap } from '../store/convert';
import { READ_DOC } from '../graphql/queryType';
import Loading from '../components/Loading';
import Error from '../components/Error';

const customStyles = {
  content : {
    top         : '0%',
    left        : '50%',
    right       : '0%',
    bottom      : '0%',
    marginRight : '0%'
  }
};

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      snippet: '',
      doc: '',
      showModal: false,
      forSearch: []
    };
  }

  handleOpenModal = () => {
    let newArray = forScrap(this.state.input);
    this.setState({
      forSearch: newArray,
      showModal: true
    })
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
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
    this.setState({
      snippet: output
    })
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <Modal 
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}>
          <div
            onClick={this.handleCloseModal}
            className="closeButton">
            <i className="fas fa-times-circle"></i>
            &nbsp;&nbsp;Close
          </div>
          {
            this.state.showModal === true && (
              <Query query={READ_DOC} variables={{syntaxes: this.state.forSearch}}>
                {({ loading, error, data }) => {
                  if(loading) return <Loading />
                  if(error) return <Error />
                  return (
                    <div className="docContainer">
                      {
                        data.documentation.map(oneDoc => {
                          return (
                            oneDoc.doc[0].split(',').map(result => {
                              return (
                                <div className="docItem">
                                  <a href={result} target="_blank">{result}</a>
                                </div>
                              )
                            })
                          )
                        })
                      }
                    </div>
                  )
                }}
              </Query>
            )
          }
        </Modal>
        <div className="topBar">
          <div>&nbsp;</div>
          <div className="topBarContent">
            <p
              className="buttonToConvert"
              onClick={() => this.convertData()}>
              <i className="fas fa-play-circle"></i>
              &nbsp;&nbsp;Convert
            </p>
            <p
              className="buttonToConvert"
              onClick={this.handleOpenModal}>
              <i className="fas fa-file-alt"></i>
              &nbsp;&nbsp;See the Documentation
            </p>
          </div>
          <div>&nbsp;</div>
        </div>
        <div className="lineForMain">
          <div className="lineInside"></div>
        </div>
        <div className="boxSnippet">
          <div className="smallBoxLeft">
            <AceEditor
              className="forInput"
              mode="javascript"
              name="input"
              theme="monokai"
              onChange={this.getData}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.input}
              height='490px'
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
              style={{ maxHeight: 476, maxWidth: 625 }}
              value={this.state.snippet}>
            </TextareaAutosize>
          </div>
        </div>
        <div className="footerPosition">
          <div className="footer">2018 &copy; Coddoc Team</div>
        </div>
      </div>
    );
  };
};
