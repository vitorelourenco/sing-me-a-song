class ErrorWithStatus extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ErrorWithStatus.prototype);
  }
  code() {
    return this.message;
  }
}

export default ErrorWithStatus;
