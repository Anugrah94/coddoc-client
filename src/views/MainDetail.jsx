import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Modal from 'react-modal';
import { Query } from 'react-apollo';
import axios from 'axios';

import 'brace/mode/ruby';
import 'brace/mode/python';
import 'brace/theme/tomorrow';
import 'brace/theme/xcode';

import { READ_HISTORY, READ_DOC } from '../graphql/queryType';

import NavBar from '../components/NavBar';
import './Page.css';
import userStore from '../store/user';
import Loading from '../components/Loading';
import Error from '../components/Error';

import { pythonjs, forScrapPython } from '../store/convertJsPython';
import { rubyjs, forScrapRuby } from '../store/convertJsRuby';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      snippet: '',
      doc: '',
      showModal: false,
      showModal2: false,
      historyName: '',
      value: ''
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    this.setState({
      value: sessionStorage.getItem('language')
    })
    if(token) {
      userStore.logIn()
      axios.get(`https://api.coddoc.net/history/${this.props.match.params.id}`)
        .then(response => {
          this.setState({
            historyData: response.data.result,
            input: response.data.result.code
          })
        })
        .catch(err => {
          console.log('gagal');
        })
    } else {
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
      [e.target.name]: e.target.value
    })
  }

  getDataInput = (e) => {
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
    this.updateData()
  }

  updateData = () => {
    axios.put(`https://api.coddoc.net/history/update/${this.props.match.params.id}`, {
      code: this.state.input
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log('success');
      })
      .catch(err => {
        console.log('failed');
      })
  };

  handleSubmit = (e, saveHistory) => {
    e.preventDefault();
    if(this.state.historyName.length > 0) {
      saveHistory({
        variables: {
          name: this.state.historyName,
          code: '',
          token: localStorage.getItem('token')
        }
      });
    } else {
      saveHistory({
        variables: {
          code: '',
          token: localStorage.getItem('token')
        }
      });
    }
  };

  handleChange = (e) => {
    this.setState({value: e.target.value});
    sessionStorage.setItem('language', e.target.value);
  };

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <Modal 
          isOpen={this.state.showModal}
          contentLabel="Modal 1"
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
          <div className="topBarLeft">
            <Query query={READ_HISTORY} variables={{_id: this.props.match.params.id}}>
              {({ loading, error, data}) => {
                if(loading) return '';
                if(error) return '';
                return (
                  <div className="historyName">
                    <p>{ `History: ${ data.history.name }` }</p>
                  </div>
                )
              }}
            </Query>
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
          <div className="rightBar">
            <div className="selectOption">Select Converted Language:</div>
            <div className="selectOption">
              <select
                value={this.state.value}
                onChange={this.handleChange}
                className="selectButton">
                <option value="python">Python</option>
                <option value="ruby">Ruby</option>
              </select>
            </div>
          </div>
        </div>
        <div>
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
                onChange={this.getDataInput}
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
            <div className="smallBoxRight">
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
        </div>
        <div className="footerPosition">
          <div className="footer">2018 &copy; Coddoc Team</div>
        </div>
      </div>
    );
  };
};