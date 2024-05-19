// TODO
export class CustomError extends Error {
    statusCode: number;
    constructor(...args: ConstructorParameters<typeof Error>) {
      super(...args);
      this.statusCode = 404;
    }
  }