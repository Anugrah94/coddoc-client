import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import AceEditor from 'react-ace';
import Modal from 'react-modal';
import { Query } from 'react-apollo';
import axios from 'axios';
import { Mutation } from 'react-apollo';

import 'brace/mode/java';
import 'brace/theme/github';

import NavBar from '../components/NavBar';
import { READ_HISTORY, READ_DOC } from '../graphql/queryType';
import { ADD_HISTORY } from '../graphql/mutationType';
import '../views/Page.css';
import userStore from '../store/user';
import Loading from '../components/Loading';
import Error from '../components/Error';

import { pythonjs, forScrap } from '../store/convert';

const customStyles = {
  content : {
    top         : '0%',
    left        : '50%',
    right       : '0%',
    bottom      : '0%',
    marginRight : '0%'
  }
};

const customStyles2 = {
  content : {
    top         : '33%',
    left        : '25%',
    right       : '25%',
    bottom      : '33%',
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
      showModal2: false,
      historyName: ''
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    console.log(this.props)
    if(token) {
      userStore.logIn()
      axios.get(`http://localhost:3000/history/${this.props.match.params.id}`)
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
    let output = pythonjs(this.state.input)
    this.setState({
      snippet: output
    })
    this.updateData()
  }

  updateData = () => {
    axios.put(`http://localhost:3000/history/update/${this.props.match.params.id}`, {
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

  handleOpenModal2 = () => {
    this.setState({ showModal2: true });
  };
  
  handleCloseModal2 = () => {
    this.setState({ showModal2: false });
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

  render() {
    return (
      <div>
        <NavBar props={this.props}/>
        <Modal 
          isOpen={this.state.showModal2}
          contentLabel="Modal 2"
          style={customStyles2}>
          <div
            onClick={this.handleCloseModal2}
            className="closeButton">
            <i className="fas fa-times-circle"></i>
            &nbsp;&nbsp;Close
          </div>
          <div className="docContainer">
            <div className="createTitle">Create new history</div>
            <Mutation mutation={ADD_HISTORY}>
              {(saveHistory, { data }) => (
                <form
                  className="createForm"
                  onSubmit={e => this.handleSubmit(e, saveHistory)}>
                <input
                  type="text"
                  placeholder="history name..."
                  className="inputForm"
                  name="historyName"
                  value={this.state.historyName}
                  onChange={this.getData}/>
                <button type="submit" className="formButton">Submit</button>
                {data && (
                  this.props.history.push(`/main/detail/${data.saveHistory._id}`),
                  window.location.reload()
                )}
              </form>
              )}
            </Mutation>
          </div>
        </Modal>
        <Modal 
          isOpen={this.state.showModal}
          contentLabel="Modal 1"
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
          <div className="topBarLeft">
            <p
              className="buttonToConvert"
              onClick={this.handleOpenModal2}>
              <i className="fas fa-file"></i>
              &nbsp;&nbsp;Create new
            </p>
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
          <div>&nbsp;</div>
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
                onChange={this.getDataInput}
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
                style={{ maxHeight: 500, maxWidth: 616 }}
                value={this.state.snippet}>
              </TextareaAutosize>
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
