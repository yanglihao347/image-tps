import React from 'react';
import '../../App.css';
import { Upload, Button, Pagination } from 'antd';
import request from '../../utils/request';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  withRouter,
} from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      marker: '',
      pageNo: 1,
      total: 1,
      isLoading: true
    };
  }

  componentDidMount() {
    this.getList(1,20);
    console.log('=====this.props', this.props);
  }

  getList = (pageNo, pageSize) => {
    request.get('/api/tps/list', {
      pageNo,
      pageSize,
    }).then((res) => {
      console.log('get list', res);
      if(res.code === 301) {
        this.props.history.push('/login')
      }
      const { list = [], total } = res.data;
      this.setState({
        list,
        total,
        isLoading: false,
      })
    })
  };

  render() {
    const { list } = this.state;
    const _this = this;

    const props = {
      name: 'file',
      action: '/api/tps/upload',
      // fileList: [],
      beforeUpload: () => {
        this.setState({
          isLoading: true
        })
      },
      onChange: (info) => {
        // console.log(info);
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList, '=======ing');
        // }
        if (info.file.status === 'done') {
          _this.setState({
            pageNo: 1,
          });
          _this.getList(1, 20);
        } else if (info.file.status === 'error') {
          console.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className="App">
        <header className="App-header">
          <Button onClick={() => {
            request.get('/api/users/logout').then((res) => {
              console.log(res);
              this.props.history.replace('/login');
            });
          }}>退出登录</Button>
          <Upload {...props}>
            <Button>点击上传</Button>
          </Upload>
          <div className="img-list">
            {list.map((item) => {
              return (
                <CopyToClipboard text={item.img_url} className="clipboard">
                  <div>
                    <img src={item.img_url} />
                  </div>
                </CopyToClipboard>
              );
            })}
          </div>
          <Pagination
            current={this.state.pageNo}
            pageSize={20}
            showSizeChanger={false}
            disabled={this.state.isLoading}
            onChange={(page, pageSize) => {
              this.setState({
                isLoading: true,
                pageNo: page,
              });
              this.getList(page, 20);
            }}
            total={this.state.total}
          />
        </header>
      </div>
    );
  }
}

export default withRouter(Main);
