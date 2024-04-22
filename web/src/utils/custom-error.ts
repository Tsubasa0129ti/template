const errorMessages = {
  UNPROCESSABLE_ENTITY: '',
  INTERNAL_SERVER_ERROR: 'システム障害が発生しました。',
  NETWORK_ERROR: 'ネットワークエラーが発生しました。しばらくしてから再度お試しください。'
};
type errorMessages = (typeof errorMessages)[keyof typeof errorMessages];

interface CustomErrorInterface {
  name: string;
  message: string;
}

abstract class CustomError extends Error implements CustomErrorInterface {
  constructor(message: string, { cause }: Error) {
    super(message);
    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true
    });
    this.cause = cause;
  }
}

/**
 * Unprocessable Entityを補足するカスタムエラーハンドラ。
 */
class UnprocessableEntity extends CustomError {
  /**
   * カスタムエラーオブジェクトを生成する。
   *
   * @param error エラーオブジェクト
   */
  constructor(error: Error) {
    super(errorMessages.UNPROCESSABLE_ENTITY, error);
  }
}

/**
 * Internal Server Errorを捕捉するカスタムエラーハンドラ。
 */
class InternalServerError extends CustomError {
  /**
   * カスタムエラーオブジェクトを生成する。
   *
   * @param error エラーオブジェクト
   */
  constructor(error: Error) {
    super(errorMessages.INTERNAL_SERVER_ERROR, error);
  }
}

/**
 * Network Errorを捕捉するカスタムエラーハンドラ。
 */
class NetWorkError extends CustomError {
  /**
   * カスタムエラーオブジェクトを生成する。
   *
   * @param error エラーオブジェクト
   */
  constructor(error: Error) {
    super(errorMessages.NETWORK_ERROR, error);
  }
}

export { UnprocessableEntity, InternalServerError, NetWorkError };
