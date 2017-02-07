import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const CreateMember = (props) => {
  const {
    onSubmit,
    onInputChange,
    newUserNameValue,
    fetchMemberList,
    isTokenExisted,
    NEW_USER_NAME_PROPERTY
  } = props;

  return (
    <Paper
      zDepth={3}
      style={{
        flex: '0 1 30%',
        padding: 20
      }}>
      <h2>新用戶註冊區</h2>
      <TextField
        floatingLabelText="new member name"
        value={newUserNameValue}
        name={NEW_USER_NAME_PROPERTY}
        onChange={handleInputChange}
      />
      <br />
      <RaisedButton label="註冊新用戶" onClick={handleSubmit} primary={true} disabled={!isTokenExisted}/>
    </Paper>
  );

  function handleSubmit() {
    onSubmit(newUserNameValue)
      .then(() => {
        fetchMemberList()
        onInputChange(NEW_USER_NAME_PROPERTY, '')
      })
      .catch(err => console.log(err))
  }

  function handleInputChange(e, value) {
    console.log(NEW_USER_NAME_PROPERTY)
    onInputChange(e.target.name, value)
  }
}

export default CreateMember;
