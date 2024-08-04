// eslint-disable-next-line max-classes-per-file
export class FullError extends Error {
  code = '000';
  status = 500;
}

export class InternalError extends FullError {
  constructor() {
    super('InternalError');
    this.message = 'Internal error. Try again later';
    this.name = 'InternalError';
    this.status = 500;
    this.code = '001';
  }
}

export class IncorrectDataType extends FullError {
  constructor() {
    super('IncorrectDataType');
    this.message = 'Received request is not json type';
    this.name = 'IncorrectDataType';
    this.status = 400;
    this.code = '002';
  }
}

export class MissingProcessPlatformError extends FullError {
  constructor() {
    super('MissingProcessPlatformError');
    this.message = 'process.platform is missing';
    this.name = 'MissingProcessPlatformError';
    this.status = 500;
    this.code = '003';
  }
}

export class MissingFileNameError extends FullError {
  constructor() {
    super('MissingFileNameError');
    this.message = 'Uploaded file is missing name';
    this.name = 'MissingFileNameError';
    this.status = 400;
    this.code = '004';
  }
}

export class FileTooBigError extends FullError {
  constructor() {
    super('FileTooBigError');
    this.message = 'Uploaded file is too bid';
    this.name = 'FileTooBigError';
    this.status = 400;
    this.code = '005';
  }
}

export class FileNotAllowedError extends FullError {
  constructor() {
    super('FileNotAllowedError');
    this.message = 'File is not allowed';
    this.name = 'FileNotAllowedError';
    this.status = 415;
    this.code = '005';
  }
}

export class CannotAddImageError extends FullError {
  constructor() {
    super('CannotAddImageError');
    this.message = 'Cannot add image. Try again later';
    this.name = 'CannotAddImageError';
    this.status = 400;
    this.code = '006';
  }
}

export class FileMovedError extends FullError {
  constructor() {
    super('FileMovedError');
    this.message = 'File has been moved or removed and is no longer available.';
    this.name = 'FileMovedError';
    this.status = 404;
    this.code = '007';
  }
}

export class NoDataError extends FullError {
  constructor() {
    super('NoDataError');
    this.message = 'Could not find element with provided params';
    this.name = 'NoDataError';
    this.status = 404;
    this.code = '008';
  }
}
