import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '../index.module.css';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
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

  renderSize = () => {
    const { item } = this.props;
    let cname = '';
    if (item.image_width <= 100 && item.image_height <= 100) {
      cname = '';
    } else if (item.image_width <= item.image_height) {
      cname = styles['height-image'];
    } else {
      cname = styles['width-image'];
    }
    return cname;
  };

  render() {
    const { item } = this.props;
    const { type } = this.state;

    return (
      <CopyToClipboard text={item.img_url} className={styles['img-container']}>
        <div className={styles['img-container']}>
          <img className={this.renderSize()} src={item.img_url} />
          <span className={styles['check-icon']}>&#xe617;</span>
        </div>
      </CopyToClipboard>
    );
  }
}

export default withRouter(ImageCard);
