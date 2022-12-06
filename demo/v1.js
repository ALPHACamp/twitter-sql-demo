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

    const data = categories.filter(category => category.id === categoryId)
      .map(category => {
        const result = { category: category.toJSON(), restaurantCount: restaurants.filter(restaurant => restaurant.categoryId === category.id).length }
        return result
      })

    const hrend = process.hrtime(hrstart)
    console.log('# V1 timer:', `${hrend[0]}s${hrend[1] / 1000000}ms`)

    return data
  })
}
