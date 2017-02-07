import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';

const propTypes = {
  USER_NAME_PROPERTY: PropTypes.string.isRequired,
  USER_PWD_PROPERTY: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pwd: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  resetMsg: PropTypes.func.isRequired,
  isLoginFailed: PropTypes.bool.isRequired,
  isLoginSuccessed: PropTypes.bool.isRequired,
  checkToken: PropTypes.func.isRequired
};

const Login = (props) => {
  const {
    name,
    pwd,
    onSubmit,
    onInputChange,
    USER_NAME_PROPERTY,
    USER_PWD_PROPERTY,
    isLoginFailed,
    isLoginSuccessed,
    resetMsg,
    checkToken
  } = props;

  return (
    <Paper
      zDepth={3}
      style={{
      flex: '0 1 30%',
      padding: 20
    }}>
      <h2>使用者註冊區</h2>
      <TextField
        floatingLabelText="name"
        value={name}
        name={USER_NAME_PROPERTY}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        floatingLabelText="password"
        value={pwd}
        name={USER_PWD_PROPERTY}
        onChange={handleInputChange}
      />
      <br />
      <RaisedButton label="登入" onClick={handleSubmit} primary={true} disabled={isInputEmpty()}/>
      <Snackbar
        open={isLoginFailed}
        message='錯誤發生，請重新輸入'
      />
      <Snackbar
        open={isLoginSuccessed}
        message='登入成功'
      />
    </Paper>
  );

  function handleSubmit() {
    onSubmit(name, pwd)
      .then(() => {
        onInputChange(USER_NAME_PROPERTY, '')
        onInputChange(USER_PWD_PROPERTY, '')
        checkToken()
      })
  }

  function handleInputChange(e, value) {
    resetMsg()
    onInputChange(e.target.name, value)
  }

  function isInputEmpty() {
    return name === '' || pwd === ''
  }
}

Login.propTypes = propTypes;

export default Login;
