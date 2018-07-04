import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Modal from 'react-modal';
import { Query } from 'react-apollo';
import brace from 'brace';

import 'brace/mode/java';
import 'brace/mode/ruby';
import 'brace/mode/python';
import 'brace/theme/tomorrow';
import 'brace/theme/xcode';

import './Page.css';
import userStore from '../store/user';
import NavBar from '../components/NavBar';
import { pythonjs, forScrapPython } from '../store/convertJsPython';
import { rubyjs, forScrapRuby } from '../store/convertJsRuby';
import { READ_DOC } from '../graphql/queryType';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      snippet: '',
      doc: '',
      showModal: false,
      forSearch: [],
      value: ''
    };
  };

  componentDidMount() {
    this.setState({
      value: sessionStorage.getItem('language')
    });
    let token = localStorage.getItem('token')
    if(token) {
      userStore.logIn()
      this.props.history.push('/main/profile')
    } else {
      userStore.wantLogin()
      userStore.resetAll()
    }
  }

  handleOpenModal = () => {
    if (this.state.value === 'python') {
      let newArray = forScrapPython(this.state.input);

      this.setState({
        forSearch: newArray,
        showModal: true
      });
    } else {
      let newArray = forScrapRuby(this.state.input);

      this.setState({
        forSearch: newArray,
        showModal: true
      });
    }
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
    if(this.state.value === 'python'){
      let output = pythonjs(this.state.input);

      this.setState({
        snippet: output
      });
    } else {
      let output = rubyjs(this.state.input);

      this.setState({
        snippet: output
      });
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
    sessionStorage.setItem('language', e.target.value)
  }

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <Modal 
          isOpen={this.state.showModal}
          contentLabel="Modal Doc"
          className="customModal"
          overlayClassName="customOverlay">
          <div
            onClick={this.handleCloseModal}
            className="closeButton">
            <i className="fas fa-times-circle"></i>
            &nbsp;&nbsp;Close
          </div>
          <div className="titleModal">Documentation for your code based on {this.state.value} language</div>
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
                            <div className="insideContainer">
                              <div className="titleDoc">{`Learn ${oneDoc.syntax}`}</div>
                                {oneDoc.doc[0].split(',').map((result, index) => {
                                  return (
                                    <div className="docItem">
                                      <a href={result} target="_blank" className="textDoc">{`Documentation ${index + 1}`}</a>
                                    </div>
                                  )
                                })}
                            </div>
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
          <div className="leftBar">
            <div className="selectOption">Select Converted Language:</div>
            <div className="selectOption2">
              <select
                value={this.state.value}
                onChange={this.handleChange}
                className="selectButton">
                <option value="python">Python</option>
                <option value="ruby">Ruby</option>
              </select>
            </div>
          </div>
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
              theme="tomorrow"
              onChange={this.getData}
              fontSize={20}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.input}
              height='530px'
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
          <div className="smallBoxLeft">
          <AceEditor
              className="forOutput"
              mode={ this.state.value === 'python' ? 'python' : 'ruby' }
              theme="tomorrow"
              fontSize={20}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.snippet}
              readOnly={true}
              height='530px'
              width='620vr'
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}/>
          </div>
        </div>
        <div className="footerPosition">
          <div className="footer">2018 &copy; Coddoc Team</div>
        </div>
      </div>
    );
  };
};
