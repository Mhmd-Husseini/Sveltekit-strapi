import axios from 'axios';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') || '1');
  const minPrice = Number(url.searchParams.get('minPrice') || '0');
  const maxPrice = Number(url.searchParams.get('maxPrice') || '5000');

  try {
    const res = await axios.get('http://127.0.0.1:1337/api/products/', {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': 10,
        'filters[price][$gte]': minPrice,
        'filters[price][$lte]': maxPrice,
      },
    });
    const products = res.data.data;
    console.log(products)

    const pagination = res.data.meta.pagination;

    return {
      products,
      pagination,
      page,
      minPrice,
      maxPrice,
    };
  } catch (error) {
    console.error(error);
    return {
      products: [],
      pagination: null,
      page,
      minPrice,
      maxPrice,
    };
  }
};
