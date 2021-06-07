import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';

import styles from './index.module.css';
import request from '../../utils/request';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    const { username, password } = this.state;
    return (
      <div className={styles['page-wrap']}>
        <div className={styles['main-container']}>
          <h3 className={styles['login-title']}>TPS图床</h3>
          <Input
            className={styles['username-input']}
            placeholder='请输入用户名'
            value={username}
            onChange={(e) => {
              this.setState({
                username: e.target.value,
              });
            }}
          />
          <Input.Password
            className={styles['password-input']}
            placeholder='密码'
            value={password}
            onChange={(e) => {
              this.setState({
                password: e.target.value,
              });
            }}
          />
          <Button
            className={styles['login-btn']}
            onClick={() => {
              request
                .post('/api/users/login', { username, password })
                .then((res) => {
                  console.log('====login res', res);
                  if (res.code === 200) {
                    this.props.history.replace('/');
                  }
                });
            }}
          >
            登录
          </Button>
        </div>

        {/* <Button onClick={() => {
        request.post('/api/users/register', { username, password }).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.props.history.replace('/');
          }
        })
      }}>注册</Button> */}
      </div>
    );
  }
}

export default withRouter(Login);
