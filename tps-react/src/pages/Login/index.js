import React, { Component } from 'react';
import { Input, Button } from 'antd';
import {
  withRouter,
} from "react-router-dom";

import request from '../../utils/request';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

  }
  render() {
    const { username, password } = this.state;
    return (<div>
      <Input
        value={username}
        placeholder="Basic usage"
        onChange={(e) => {
          this.setState({
            username: e.target.value
          })
        }}
      />
      <Input.Password
        placeholder="input password"
        value={password}
        onChange={(e) => {
          this.setState({
            password: e.target.value
          })
        }}
      />
      <Button onClick={() => {
        request.post('/api/users/login', { username, password }).then((res) => {
          console.log('====login res', res);
          if (res.code === 200) {
            this.props.history.replace('/');
          }
        })
      }}>登录</Button>
    </div>);
  }
}

export default withRouter(Login);