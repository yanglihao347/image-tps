import React from 'react';
import './App.css';
import { Upload, Button, Pagination } from 'antd';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      marker: '',
      pageNo: 1,
      total: 0,
      isLoading: true,
    }
  }

  componentDidMount() {
    this.getList(1,20);
  }

  getList(pageNo, pageSize) {
    axios.get('/api/tps/list', {
      params: {
        pageNo,
        pageSize
      }
    }).then((res) => {
      this.setState({
        list: res?.data?.data,
        total: res?.data?.total,
        isLoading: false
      })
    }).catch((e) => {
      console.log(e,'=======errr')
    })
  }

  render() {

    const { list } = this.state;
    const _this = this;

    const props = {
      name: 'file',
      action: '/api/tps/upload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        console.log(info);
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList, '=======ing');
        // }
        if (info.file.status === 'done') {
          this.setState({
            isLoading: true,
            pageNo: 1,
          })
          _this.getList(1,20);
        } else if (info.file.status === 'error') {
          console.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <Upload {...props}>
            <Button>点击上传</Button>
          </Upload>
          <div className="img-list">
            {
              list.map((item) => {

                return (
                  <CopyToClipboard text={item.link} className="clipboard">
                    <div>
                      <img src={item.link} />
                    </div>
                  </CopyToClipboard>
                )
              })
            }
          </div>
          <Pagination
            current={this.state.pageNo}
            pageSize={20}
            showSizeChanger={false}
            disabled={this.state.isLoading}
            onChange={(page, pageSize) => {
              this.setState({
                isLoading: true,
                pageNo: page
              })
              this.getList(page, 20);
              
            }}
            total={this.state.total}
          />
        </header>
      </div>
    );

  }
  
}

export default App;
