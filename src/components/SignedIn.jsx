import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import AceEditor from 'react-ace';
import Modal from 'react-modal';
import { Query } from 'react-apollo';

import 'brace/mode/java';
import 'brace/theme/github';

import { READ_HISTORY } from '../graphql/queryType'
import '../views/Page.css';
import userStore from '../store/user';

import { pythonjs, scrapping } from '../store/convert';

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
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  getData = (e) => {
    this.setState({
      input: e
    })
  }

  componentDidMount() {
    console.log(this.params)
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
        {/* <Query query={READ_HISTORY} variables={{_id: hist._id}}></Query> */}
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
        <div className="topBar">
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
        <div className="boxSnippet">
          <div className="smallBoxLeft">
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
                    height='490px'
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
              style={{ maxHeight: 500, maxWidth: 616 }}
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
