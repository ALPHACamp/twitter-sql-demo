'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const categories = Array.from({ length: 5 }, (_, i) => ({ name: faker.random.word(), createdAt: faker.date.past(), updatedAt: faker.date.past() }))
    await queryInterface.bulkInsert('Categories', categories)

    const categoryRecords = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    )

    await queryInterface.bulkInsert('Restaurants',
      Array.from({ length: 1000000 }, () => ({
        name: faker.company.name(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        categoryId: categoryRecords[Math.floor(Math.random() * categoryRecords.length)].id
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Restaurants', {})
    await queryInterface.bulkDelete('Categories', {})
  }
}
