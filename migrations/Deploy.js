const CoffeeToken = artifacts.require('CoffeeToken');
const CoffeeShop = artifacts.require('CoffeeShop');

module.exports = async function(deployer){
  //Deploy Token
  await deployer.deploy(CoffeeToken);
  const token = await CoffeeToken.deployed();

  //Deploy Shop
  await deployer.deploy(CoffeeShop,token.address);
  const coffeeshop = await CoffeeShop.deployed();

  //Transfer all tokens to Shop
  await token.transfer(coffeeshop.address,'10000000000000000000000');

}