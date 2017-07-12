import * as Bluebird from 'bluebird';

declare module 'mongoose' {
  type Promise<T> = Bluebird<T>;
}

declare module 'mongodb' {
  type Promise<T> = Bluebird<T>;
}
