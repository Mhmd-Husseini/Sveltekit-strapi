'use strict';

/**
 * scraper controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::scraper.scraper', ({ strapi }) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;
        const entity = await strapi.db.query('api::scraper.scraper').findOne({
            where: { slug }
        });

        if (!entity) {
            return ctx.notFound();
          }
      
          if (entity.enabled) {
            console.log("hi")
            await strapi.service('api::scraper.scraper').scrapeData(entity);
          }
      
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    }
}));
