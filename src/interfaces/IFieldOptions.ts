import { IFieldOptionsMeta } from './IFieldOptionsMeta';

export interface IFieldOptions {
  type: String | Number | Boolean | Object | object;
  enum?: boolean;
  array?: boolean;
  nullable?: boolean;
  meta?: IFieldOptionsMeta;
  env?: boolean;
  default?: any;
  withoutGraphQl?: boolean;
}
