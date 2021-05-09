export class ErrorLogHelper {
  public findErrorStatus = (error: any) => {
    const errorObject: {
      message: string;
      status: number;
    } = { message: 'Error', status: 404 };
    if (error.errorFrom && error.errorFrom === 'Worker') {
      errorObject.message = error.message;
    } else {
      errorObject.status = 500;
      errorObject.message = error;
    }
    return errorObject;
  }
}