import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import MemberList from './MemberList';
import CreateMember from './CreateMember';

class Main extends Component {
  constructor() {
    super();

    this.fetchAccessToken = this.fetchAccessToken.bind(this);
    this.fetchMemberList = this.fetchMemberList.bind(this);
    this.createNewMember = this.createNewMember.bind(this);
    this.mapInputValueToState = this.mapInputValueToState.bind(this);
    this.resetMsg = this.resetMsg.bind(this);
    this.checkToken = this.checkToken.bind(this);

    this.state = {
      USER_NAME_PROPERTY: 'userNameValue',
      USER_PWD_PROPERTY: 'userPwdValue',
      NEW_USER_NAME_PROPERTY: 'newUserNameValue',
      userNameValue: '',
      userPwdValue: '',
      newUserNameValue: '',
      memberList: [],
      isLoginFailed: false,
      isLoginSuccessed: false,
      isTokenExisted: false
    };
  }

  componentDidMount() {
    this.checkToken()
  }

  render() {
    const {
      state: {
        USER_NAME_PROPERTY,
        USER_PWD_PROPERTY,
        NEW_USER_NAME_PROPERTY,
        userNameValue,
        userPwdValue,
        newUserNameValue,
        memberList,
        isLoginFailed,
        isLoginSuccessed,
        isTokenExisted
      },
      fetchAccessToken,
      fetchMemberList,
      createNewMember,
      mapInputValueToState,
      resetMsg,
      checkToken
    } = this;

    return (
      <main style={{
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        <Login
          USER_NAME_PROPERTY={USER_NAME_PROPERTY}
          USER_PWD_PROPERTY={USER_PWD_PROPERTY}
          name={userNameValue}
          pwd={userPwdValue}
          isLoginFailed={isLoginFailed}
          isLoginSuccessed={isLoginSuccessed}
          onSubmit={fetchAccessToken}
          onInputChange={mapInputValueToState}
          resetMsg={resetMsg}
          checkToken={checkToken}
        />
        <MemberList
          onSubmit={fetchMemberList}
          resetMsg={resetMsg}
          memberList={memberList}
          isTokenExisted={isTokenExisted}
        />
        <CreateMember
          onSubmit={createNewMember}
          fetchMemberList={fetchMemberList}
          onInputChange={mapInputValueToState}
          newUserNameValue={newUserNameValue}
          isTokenExisted={isTokenExisted}
          NEW_USER_NAME_PROPERTY={NEW_USER_NAME_PROPERTY}
        />
      </main>
    );
  }

  fetchAccessToken(name, pwd) {
    return new Promise((resolve, reject) => {
      const URL = 'http://54.64.163.121:3443';

      axios
        .post(URL, {
          name,
          pwd
        })
        .then(({data}) => {
          localStorage.setItem('token', data.token.token)
          this.setState({isLoginSuccessed: true})
          resolve()
        })
        .catch(err => {
          this.setState({isLoginFailed: true})
          throw err
        })
    })
  }

  fetchMemberList() {
    return new Promise((resolve, reject) => {
      const URL = 'http://54.64.163.121:3443/member';
      const TOKEN = localStorage.getItem('token');

      axios({
        url: URL,
        headers: {'Authorization': TOKEN}
      })
        .then(({data}) => {
          this.setState({
            memberList: data.data.reverse()
          })
          resolve()
        })
        .catch(err => {
          throw err
        })
    })
  }

  createNewMember(name) {
    return new Promise((resolve, reject) => {
      const URL = 'http://54.64.163.121:3443/member';
      const TOKEN = localStorage.getItem('token');

      axios({
        url: URL,
        method: 'post',
        headers: {'Authorization': TOKEN},
        data: {
          name
        }
      })
        .then(response => {
          resolve()
        })
        .catch(err => {
          throw err
        })
    })
  }

  mapInputValueToState(property, value) {
    this.setState({
      [property]: value
    })
  }

  resetMsg() {
    this.setState({
      isLoginFailed: false,
      isLoginSuccessed: false
    })
  }

  checkToken() {
    this.setState({
      isTokenExisted: localStorage.getItem('token') ? true : false
    })
  }
}

export default Main;
