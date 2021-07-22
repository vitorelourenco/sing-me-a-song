declare namespace jest {
  interface Matchers<R> {
    toMatchSchema(value: any): CustomMatcherResult;
  }
}