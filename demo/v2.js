const { Category, Restaurant } = require('../models')

async function getCategoryById (id) {
  return await Category.findByPk(id)
}

async function getRestaurantsByCategoryId (categoryId) {
  return await Restaurant.findAll({ where: { categoryId } })
}

module.exports = async function getCategoryRestaurantsV2 (categoryId) {
  const hrstart = process.hrtime()

  return Promise.all([getCategoryById(categoryId), getRestaurantsByCategoryId(categoryId)]).then(result => {
    const category = result[0]
    const restaurants = result[1]
    const data = { category: category.toJSON(), restaurantCount: restaurants.length }

    const hrend = process.hrtime(hrstart)
    console.log('# V2 timer:', `${hrend[0]}s${hrend[1] / 1000000}ms`)

    return data
  })
}
