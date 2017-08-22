class Request {
  constructor(params = {}, body = {}) {
    this.params = params;
    this.body = body;
  }

  setParams(params) {
    this.params = params;
  }

  setBody(body) {
    this.body = body;
  }
}

class Response {
  constructor() {
    this.response = {};
  }
  status(statusCode) {
    this.response.status = statusCode;
    return this;
  }

  send(object) {
    this.response.data = object;
    return this.response;
  }
}

module.exports = {
  Request,
  Response
}
