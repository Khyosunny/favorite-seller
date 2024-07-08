import { ProductType } from '../types/products';
import { api } from './api';

export async function getAllProductList(pageParam: number) {
  const { data } = await api.get<ProductType[]>(`/?start=${pageParam}`);

  if (data.length < 3) {
    return {
      result: data,
      nextData: undefined,
    };
  }

  return {
    result: data,
    nextData: pageParam + data.length,
  };
}

export async function getProductListBySeller(
  seller: string,
  pageParam: number,
) {
  const { data } = await api.get<ProductType[]>(
    `/sellers/${seller}?start=${pageParam}`,
  );

  if (data.length < 3) {
    return {
      result: data,
      nextData: undefined,
    };
  }

  return {
    result: data,
    nextData: pageParam + data.length,
  };
}

export async function getProductDetailByName(name: string) {
  const { data } = await api.get<ProductType>(`/products/${name}`);

  return data;
}

export async function postSeller(seller: string) {
  const { data } = await api.post(`/sellers/${seller}:favorite`);

  return data;
}

export async function deleteSeller(seller: string) {
  const { data } = await api.delete(`/sellers/${seller}:favorite`);

  return data;
}
