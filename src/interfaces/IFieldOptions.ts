import { IFieldOptionsMeta } from './IFieldOptionsMeta';

export interface IFieldOptions {
  type: String | Number | Boolean | object;
  enum?: boolean;
  array?: boolean;
  nullable?: boolean;
  meta?: IFieldOptionsMeta;
  env?: boolean;
}
