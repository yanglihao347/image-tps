import React from 'react';
// import '../../App.css';
import { Upload, Button, Pagination } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withRouter } from 'react-router-dom';

import request from '../../utils/request';
import styles from './index.module.css';
import ImageCard from './components/ImageCard';

const { Dragger } = Upload;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      marker: '',
      pageNo: 1,
      total: 1,
      isLoading: true,
      isIn: false,
    };
  }

  componentDidMount() {
    this.getList(1, 10);
    console.log('=====this.props', this.props);
  }

  getList = (pageNo, pageSize) => {
    request
      .get('/api/tps/list', {
        pageNo,
        pageSize,
      })
      .then((res) => {
        console.log('get list', res);
        if (res.code === 301) {
          this.props.history.push('/login');
        }
        const { list = [], total } = res.data || {};
        this.setState({
          list,
          total,
          isLoading: false,
        });
      });
  };

  render() {
    const { list, isIn } = this.state;
    const _this = this;

    const props = {
      name: 'file',
      action: '/api/tps/upload',
      beforeUpload: () => {
        this.setState({
          isLoading: true,
        });
      },
      className: styles['drag-container'],
      onChange: (info) => {
        // console.log(info);
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList, '=======ing');
        // }
        if (info.file.status === 'done') {
          _this.setState({
            pageNo: 1,
          });
          _this.getList(1, 10);
        } else if (info.file.status === 'error') {
          console.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className={styles['page-wrap']}>
        <div className={styles['main-container']}>
          <div className={styles['header-container']}>
            <h3 className={styles['header']}>TPS图床</h3>
            <span
              className={styles['logout-btn']}
              onClick={() => {
                request.get('/api/users/logout').then((res) => {
                  this.props.history.replace('/login');
                });
              }}
            >
              退出登录
            </span>
          </div>
          <div className={styles['upload-container']}>
            <Dragger {...props}>
              <div>点击或拖拽至此上传</div>
              <div>仅支持上传 jpg / png / jpeg / webp / git 格式的图片</div>
            </Dragger>
          </div>
          <div className={styles['gallery-container']}>
            <div className={styles['img-list']}>
              {list.map((item) => {
                return <ImageCard item={item} />;
              })}
            </div>
            <Pagination
              current={this.state.pageNo}
              pageSize={10}
              showSizeChanger={false}
              disabled={this.state.isLoading}
              onChange={(page, pageSize) => {
                this.setState({
                  isLoading: true,
                  pageNo: page,
                });
                this.getList(page, 10);
              }}
              total={this.state.total}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
