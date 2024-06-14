'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::scraper.scraper', ({ strapi }) => ({
  async scrapeData(scraper) {
    const url = 'https://ayoubcomputers.com/laptops/';

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const products = [];

    $('#product-listing-container .productGrid .product').each((index, element) => {
      const description = $(element).find('.card-title a').text().trim();
      const priceText = $(element).find('.price.price--withoutTax.price--main').text().trim();
      const price = priceText ? parseInt(priceText.replace(/[^0-9.-]+/g, '')) : null;
      const link = $(element).find('.card-title a').attr('href');
      const image = $(element).find('img').attr('src');

      const product = {
        name: description.split('"')[0].trim().concat('"'),
        description,
        link,
        image,
      };

      if (price !== null && !isNaN(price)) {
        product.price = price;
      }

      products.push(product);
    });

    const existingProducts = await strapi.entityService.findMany('api::product.product', {
      fields: ['id', 'link', 'name', 'description', 'price', 'image'],
    });

    for (const product of products) {
      // @ts-ignore
      const existingProduct = existingProducts.find(p => p.link === product.link);

      if (existingProduct) {
        const isDifferent = ['name', 'description', 'price', 'image'].some(key => {
          return product[key] !== existingProduct[key];
        });

        if (isDifferent) {
            // @ts-ignore
            await strapi.entityService.update('api::product.product', existingProduct.id, {
              data: {
                ...product,
                publishedAt: new Date(), // Set publishedAt to current date and time
              },
            });
          }
        } else {
          await strapi.entityService.create('api::product.product', {
            data: {
              ...product,
              publishedAt: new Date(), // Set publishedAt to current date and time
            },
        });
      }
    }
  },
}));
