import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '../index.module.css';

import Dialog from '../../../components/Dialog';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      showIcon: false,
    };
  }

  componentDidMount() {
    const { item } = this.props;
    if (item.image_width >= item.image_height) {
      this.setState({
        type: 1,
      });
    }
  }

  imageSize = (item) => {
    let cname = '';
    if (item.image_width <= 150 && item.image_height <= 150) {
      cname = '';
    } else if (item.image_width <= item.image_height) {
      cname = styles['height-image'];
    } else {
      cname = styles['width-image'];
    }
    return cname;
  };

  delete = (e) => {
    e.stopPropagation();
    const { deleteImage, item } = this.props;
    Dialog({
      title: '确认删除吗？',
      content:
        '删除线上正在使用的图片会导致图片不可展示，且不可恢复，请谨慎操作！',
      onOk: () => {
        deleteImage([item.img_id]);
      },
    });
  };

  renderIcon = (item) => {
    const { showIcon } = this.state;
    if (showIcon) {
      return (
        <div className={styles['icon-groups']}>
          <CopyToClipboard text={item.img_url}>
            <span
              className={styles['icon-item']}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              &#xe61c;
            </span>
          </CopyToClipboard>
          <span
            onClick={(e) => {
              e.stopPropagation();
              window.open(item.img_url);
            }}
            className={styles['icon-item']}
          >
            &#xe617;
          </span>
          <span onClick={this.delete} className={styles['icon-item']}>
            &#xe63c;
          </span>
        </div>
      );
    }
    return <div className={styles['original-name']}>{item.original_name}</div>;
  };

  renderCheckBox = (item) => {
    const { checked } = item;
    // const { chooseCheck, index } = this.props;
    // const { showIcon } = this.state;
    if (checked) {
      return <span className={styles['icon-checked']}>&#xe640;</span>;
    }
  };

  render() {
    const { item } = this.props;
    const { type } = this.state;
    const { checked } = item;
    return (
      <div
        className={`${styles['card-container']} ${
          checked ? styles['card-checked'] : ''
        }`}
        onMouseOver={() => {
          this.setState({
            showIcon: true,
          });
        }}
        onMouseLeave={() => {
          this.setState({
            showIcon: false,
          });
        }}
        onClick={() => {
          const { checked } = item;
          const { chooseCheck, index } = this.props;
          chooseCheck(index, !checked);
        }}
        // onDoubleClick={(e) => {
        //   e.stopPropagation();
        //   e.preventDefault();
        // }}
      >
        <div className={styles['img-container']}>
          <img className={this.imageSize(item)} src={item.img_url} />
        </div>
        {this.renderIcon(item)}
        {this.renderCheckBox(item)}
      </div>
    );
  }
}

export default withRouter(ImageCard);
