/*
 弹出框
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button } from 'antd';

const wrapper = (fn, cb) => {
  return () => {
    let res;

    if (typeof fn === 'function') {
      res = fn(cb);
    }

    if (res && res.then) {
      res.then((result) => {
        if (result !== false) {
          cb();
        }
      });
    } else if (res !== false) {
      cb();
    }
  };
};

class IotDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    let visible = nextProps.visible;

    if (visible !== this.state.visible) {
      this.setState({ visible });
    }
  }

  close = () => {
    this.props._reactNode ||
      this.setState({
        visible: false,
      });
  };

  render() {
    const { title, content } = this.props;
    return (
      <Modal
        visible={this.state.visible}
        title={title}
        onClose={wrapper(this.props.onClose, this.close)}
        onCancel={wrapper(this.props.onCancel, this.close)}
        onOk={wrapper(this.props.onOk, this.close)}
      >
        {content ? <div className='dialog-content'>{content}</div> : null}
      </Modal>
    );
  }
}

IotDialog.defaultProps = {
  autoFocus: false,
};

export default (props, esModule, module) => {
  if (esModule) {
    return <IotDialog visible={false} {...props} _reactNode={true} />;
  }

  return ReactDOM.render(
    <IotDialog visible={true} {...props} />,
    document.createElement('div')
  );
};
