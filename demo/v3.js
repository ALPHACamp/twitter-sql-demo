const { Category, Restaurant } = require('../models')

async function getCategoryById (id) {
  return await Category.findByPk(id)
}

async function getRestaurantsCountByCategoryId (categoryId) {
  return await Restaurant.count({ where: { categoryId } })
}

module.exports = async function getCategoryRestaurantsV2 (categoryId) {
  const hrstart = process.hrtime()

  return Promise.all([getCategoryById(categoryId), getRestaurantsCountByCategoryId(categoryId)]).then(result => {
    const category = result[0]
    const restaurantCount = result[1]
    const data = { category: category.toJSON(), restaurantCount }

    const hrend = process.hrtime(hrstart)
    console.log('# V3 timer:', `${hrend[0]}s${hrend[1] / 1000000}ms`)

    return data
  })
}
