export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
