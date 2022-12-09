const { Category, Restaurant } = require('../models')

async function getCategories () {
  return await Category.findAll()
}

async function getRestaurants () {
  return await Restaurant.findAll()
}

module.exports = async function getCategoryRestaurantsV1 (categoryId) {
  const hrstart = process.hrtime()

  return Promise.all([getCategories(), getRestaurants()]).then(result => {
    const categories = result[0]
    const restaurants = result[1]

    const target = categories.find(category => category.id === categoryId)
    const data = {}

    if (target) {
      data.category = target.toJSON()
      data.restaurantCount = restaurants.filter(restaurant => restaurant.categoryId === target.id).length
    }

    const hrend = process.hrtime(hrstart)
    console.log('# V1 timer:', `${hrend[0]}s${hrend[1] / 1000000}ms`)

    return data
  })
}
