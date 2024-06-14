module.exports = {

  "*/300 * * * *": async ({ strapi }) => {

    try {
              console.log("hi")
              const scraper = await strapi.entityService.findMany('api::scraper.scraper', {
                filters: { slug: 'https-ayoubcomputers-com-laptops' }, 
                limit: 1,
              });
      
              if (scraper.length > 0) {      
                const { scrapeData } = strapi.service('api::scraper.scraper');
                await scrapeData();
      
                console.log(`Scraping done. `);
              } else {
                console.error('Scraper entity not found.');
              }
            } catch (error) {
              console.error('Error in scrape job:', error);
            }
          }
};
