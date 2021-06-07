class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }
    if (message) {
      this.message = message;
    }
    if (data) {
      this.data = data;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.success = true;
    this.code = 200;
  }
}

class FailModel extends BaseModel {
  constructor(message, code) {
    super(message);
    this.success = false;
    this.code = code || 400;
  }
}

module.exports = {
  SuccessModel,
  FailModel,
};
