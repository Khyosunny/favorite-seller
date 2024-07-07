import axios from 'axios';
import { ProductType } from '../types/products';

export async function getAllProductList(pageParam: number) {
  const { data } = await axios.get<ProductType[]>(
    `http://localhost/?start=${pageParam}`,
  );

  if (data.length < 4) {
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
  const { data } = await axios.get<ProductType[]>(
    `http://localhost/sellers/${seller}?start=${pageParam}`,
  );

  if (data.length < 4) {
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
  const { data } = await axios.get<ProductType>(
    `http://localhost/products/${name}`,
  );

  return data;
}

export async function postSeller(seller: string) {
  const { data } = await axios.post(
    `http://localhost/sellers/${seller}:favorite`,
  );

  return data;
}

export async function deleteSeller(seller: string) {
  const { data } = await axios.delete(
    `http://localhost/sellers/${seller}:favorite`,
  );

  return data;
}
