export interface IFieldOptionsMeta {
  min?: number;
  max?: number;
  pattern?: RegExp;
  arrayMinSize?: number;
  allow?: string[] | number[];
  int?: boolean;
}
