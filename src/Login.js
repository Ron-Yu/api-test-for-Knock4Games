import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const propTypes = {
  name: PropTypes.string.isRequired,
  pwd: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
}

const Login = (props) => {
  const {
    name,
    pwd,
    onSubmit,
    onInputChange
  } = props;

  return (
    <section>
      <TextField
        floatingLabelText="name"
        value={name}
        data-input-property="userName"
        onChange={handleInputChange}
      />
      <br />
      <TextField
        floatingLabelText="password"
        value={pwd}
        data-input-property="userPwd"
        onChange={handleInputChange}
      />
      <br />
      <RaisedButton label="Default" onClick={handleSubmit} />
    </section>
  );

  function handleSubmit() {
    onSubmit(name, pwd);
  }

  function handleInputChange(e, value) {
    onInputChange(e.target.dataset.inputProperty, value)
  }
}

Login.propTypes = propTypes;

export default Login;
