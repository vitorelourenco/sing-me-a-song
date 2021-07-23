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

export const printError = (err:any) =>{
  if (err?.code && err?.detail){
    console.error("database error " + err.detail, err.code);
  } else if (err?.code()){
    console.error("smas error with HTML statuscode", err.code())
  } else {
    console.error(err.message);
  }
}
