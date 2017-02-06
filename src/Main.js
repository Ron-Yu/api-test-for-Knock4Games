import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import MemberList from './MemberList'
import CreateMember from './CreateMember'

class Main extends Component {
  constructor() {
    super();

    this.fetchAccessToken = this.fetchAccessToken.bind(this);
    this.fetchMemberList = this.fetchMemberList.bind(this);
    this.createNewMember = this.createNewMember.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      memberList: [],
      userName: '',
      userPwd: '',
      newMemberName: ''
    };
  }

  render() {
    const {
      state: {
        userName,
        userPwd,
        memberList,
        newMemberName
      },
      fetchAccessToken,
      fetchMemberList,
      createNewMember,
      onInputChange
    } = this;

    return (
      <main>
        <Login name={userName} pwd={userPwd} onSubmit={fetchAccessToken} onInputChange={onInputChange}/>
        <MemberList onSubmit={fetchMemberList}  />
        <CreateMember onSubmit={createNewMember} />
      </main>
    );
  }

  fetchAccessToken(name, pwd) {
    const PATH = 'http://54.64.163.121:3443';

    axios
      .post(PATH, {
        name,
        pwd
      })
      .then(({data}) => {
        console.log(data)
        localStorage.setItem('token', data.token.token)
      })
  }

  fetchMemberList() {

  }

  createNewMember() {

  }

  onInputChange(property, value) {
    this.setState({
      [property]: value
    })
  }
}

export default Main;
