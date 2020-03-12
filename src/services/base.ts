export interface Response<T> {
  success: boolean;
  data: any;
  [key: string]: any;
}
