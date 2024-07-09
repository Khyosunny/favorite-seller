export interface ResponseType<T> {
  result: T;
  nextData: number | undefined;
}

export interface ProductType {
  seller: string;
  name: string;
  price: number;
  favorite: boolean;
}
