import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import Paper from 'material-ui/Paper';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  resetMsg: PropTypes.func.isRequired,
  memberList: PropTypes.array.isRequired,
  isTokenExisted: PropTypes.bool.isRequired
}

const MemberList = ({onSubmit, resetMsg, memberList, isTokenExisted}) => {
  return (
    <Paper
      zDepth={3}
      style={{
        flex: '0 1 30%',
        padding: 20,
        maxHeight: '90vh',
        overflow: 'scroll'
      }}>
      <h2>使用者列表區</h2>
      <RaisedButton label="讀取會員列表" onClick={handleSubmit} primary={true} disabled={!isTokenExisted}/>
      <List>
        {
          memberList.map(member => <ListItem key={member.ID} primaryText={member.name} leftIcon={<ContentSend />} />)
        }
      </List>
    </Paper>
  );

  function handleSubmit() {
    resetMsg();
    onSubmit()
      .then(() => {})
      .catch(err => console.log(err))
  }
}

MemberList.propTypes = propTypes;

export default MemberList;
