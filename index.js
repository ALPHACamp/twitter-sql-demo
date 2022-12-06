const getCategoryRestaurantsV1 = require('./demo/v1')
const getCategoryRestaurantsV2 = require('./demo/v2')
const getCategoryRestaurantsV3 = require('./demo/v3')

function printResult (result) {
  console.log(result)
}

async function execute (categoryId) {
  printResult(await getCategoryRestaurantsV1(categoryId))
  printResult(await getCategoryRestaurantsV2(categoryId))
  printResult(await getCategoryRestaurantsV3(categoryId))
}

execute(1).then(() => process.exit())
