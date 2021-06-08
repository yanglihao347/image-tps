import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '../index.module.css';

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
    if (item.image_width <= 110 && item.image_height <= 110) {
      cname = '';
    } else if (item.image_width <= item.image_height) {
      cname = styles['height-image'];
    } else {
      cname = styles['width-image'];
    }
    return cname;
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
          <span
            onClick={(e) => {
              e.stopPropagation();
              // showDialog();
            }}
            className={styles['icon-item']}
          >
            &#xe63c;
          </span>
        </div>
      );
    }
    return <div className={styles['original-name']}>{item.original_name}</div>;
  };

  renderCheckBox = (item) => {
    const { checked } = item;
    const { chooseCheck, index } = this.props;
    const { showIcon } = this.state;
    if (checked) {
      return <span className={styles['icon-checked']}>&#xe6a2;</span>;
    }
    if (showIcon) {
      return <span className={styles['icon-unchecked']}>&#xe63e;</span>;
    }
  };

  render() {
    const { item } = this.props;
    const { type } = this.state;

    return (
      <div
        className={styles['card-container']}
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
