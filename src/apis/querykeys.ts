export const queryKeys = {
  allProductList: ['product', 'list'],
  productListBySeller: (seller: string) => [
    ...queryKeys.allProductList,
    seller,
  ],
};
