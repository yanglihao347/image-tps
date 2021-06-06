import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '../index.module.css';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { item } = this.props;
    return (
      <CopyToClipboard text={item.img_url} className={styles['clipboard']}>
        <div className={styles['img-container']}>
          <img src={item.img_url} />
        </div>
      </CopyToClipboard>
    );
  }
}

export default withRouter(ImageCard);