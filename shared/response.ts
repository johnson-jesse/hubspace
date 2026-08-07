export type ResponsePayload<T = undefined> =
  | {
      success: false;
      message: string;
      data?: undefined;
    }
  | {
      success: true;
      message: string;
      data: T;
    };
