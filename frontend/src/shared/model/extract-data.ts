export const extractData = <T>(promise: Promise<{ data: T }>) =>
  promise.then((res) => res.data);