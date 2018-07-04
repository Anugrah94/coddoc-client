import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Modal from 'react-modal';

import { READ_USER, READ_HISTORY } from '../graphql/queryType';
import { ADD_HISTORY } from '../graphql/mutationType';

import NavBar from '../components/NavBar';
import userStore from '../store/user';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      historyName: '',
    };
  };

  componentDidMount() {
    let token = localStorage.getItem('token');
    if(token) {
      userStore.logIn();
      userStore.seeProfile();
    } else {
      userStore.resetAll();
      this.props.history.push('/');
    }
  };

  oneId = (id) => {
    userStore.setId(id);
    this.props.history.push(`/main/detail/${id}`);
  }

  getData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
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
          isOpen={this.state.showModal}
          contentLabel="Modal 2"
          className="modalInput"
          overlayClassName="overlayInput">
          <div
            onClick={this.handleCloseModal}
            className="closeButton">
            <i className="fas fa-times-circle"></i>
            &nbsp;&nbsp;Close
          </div>
          <div className="createContainer">
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
                <button
                  type="submit"
                  className="formButton">
                  Submit
                </button>
                {data && (
                  this.props.history.push(`/main/detail/${data.saveHistory._id}`),
                  window.location.reload()
                )}
              </form>
              )}
            </Mutation>
          </div>
        </Modal>
        <Query query={READ_USER} variables={{token: localStorage.getItem('token')}}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <Error />;
            return (
              <div className="container">
                <div className="profile">
                  <p className="name">{ data.user.full_name }</p>
                  <p className="username">{ `@${data.user.username}` }</p>
                  <img className="profic" src="https://image.flaticon.com/icons/svg/17/17969.svg" alt="personIcon"/>
                </div>
                <div className="history">
                  <div className="histContent">
                    <div className="historyListTitle">
                      <div className="historyListLeft">{ `${data.user.full_name}'s histories` }</div>
                      <div
                        className="buttonToConvert"
                        onClick={this.handleOpenModal}>
                        <i className="fas fa-file"></i>
                        &nbsp;&nbsp;Create new
                      </div>
                    </div>
                    { data.user.histories.map(hist => {
                      return (
                        <div
                          onClick={() => this.oneId(hist._id)}
                          className="histories">
                          <Query query={READ_HISTORY} variables={{_id: hist._id}}>
                            {({ loading, error, data}) => {
                              if(loading) return 'get data...';
                              if(error) return 'Error!';
                              return (
                                <div key={hist._id} className="listHistory">
                                  <div>
                                    <i className="fas fa-history"></i>
                                    &nbsp;&nbsp;{ data.history.name }
                                  </div>
                                  <div>Testing</div>
                                </div>
                              )
                            }}
                          </Query>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="footerPosition">
                  <div className="footer">2018 &copy; Coddoc Team</div>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  };
};
