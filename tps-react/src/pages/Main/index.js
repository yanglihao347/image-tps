import React from 'react';
// import '../../App.css';
import { Upload, Button, Pagination } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withRouter } from 'react-router-dom';

import request from '../../utils/request';
import styles from './index.module.css';
import ImageCard from './components/ImageCard';
import Dialog from '../../components/Dialog';

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
        list.map((item) => {
          item.checked = false;
        });
        this.setState({
          list,
          total,
          isLoading: false,
        });
      });
  };

  chooseCheck = (index, checked) => {
    const { list } = this.state;
    list[index].checked = checked;
    this.setState({
      list,
    });
  };

  deleteImage = (img_ids) => {
    const { pageNo } = this.state;
    console.log('deleteImage');
    request.post('/api/tps/deleteImage', { img_ids }).then((res) => {
      console.log('======deleteImage', res);
      this.getList(pageNo, 10);
    });
  };

  deleteMulti = () => {
    const { list } = this.state;
    const ids = list
      .map((item) => {
        if (item.checked) {
          return item.img_id;
        }
      })
      .filter((item) => {
        return item;
      });
    // console.log(ids);
    this.deleteImage(ids);
  };

  renderOperateBar = () => {
    const { list } = this.state;
    const flag = list.some((item) => {
      if (item.checked) {
        return true;
      }
    });

    return (
      <div className={styles['operate-bar']}>
        {flag ? (
          <div
            onClick={() => {
              Dialog({
                title: '确认删除吗？',
                content:
                  '删除线上正在使用的图片会导致图片不可展示，且不可恢复，请谨慎操作！',
                okText: '确认',
                cancelText: '取消',
                onOk: this.deleteMulti,
              });
            }}
            className={styles['delete-multiple']}
          >
            删除选中图片
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const { list, isIn } = this.state;
    const _this = this;

    const props = {
      name: 'file',
      action: '/api/tps/upload',
      multiple: true,
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
            {this.renderOperateBar()}
            <div className={styles['img-list']}>
              {list.map((item, index) => {
                return (
                  <ImageCard
                    key={item.file_name}
                    chooseCheck={this.chooseCheck}
                    deleteImage={this.deleteImage}
                    index={index}
                    item={item}
                  />
                );
              })}
            </div>
            <Pagination
              className={styles['pagination-container']}
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
