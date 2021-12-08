const main = async () => {
  const names = ["OG Buda", "MAYOT", "Scally Milano"];
  const images = ["https://pbs.twimg.com/media/EN7qq_bX0AAIok2.jpg", "https://www.songslyrics.ru/wp-content/uploads/2021/07/Mayot-5.jpg", "https://sun9-18.userapi.com/impg/qvXDo4ycsWuJ7SleRsyvM5u8lAsJX1jzETVr7Q/QHuv4sqU85w.jpg?size=1490x1920&quality=96&sign=e63d1ceae4408db948f6119ca18dc22a&type=album"];
  const hpValues = [2000, 2000, 2002];
  const attackValues = [200, 180, 159];
  const raidBoss = ['MORGENSHTERN', 'https://persono.ru/Upload/images/26%281%29.JPG', 13000, 44];
  const gameContractFactory = await hre.ethers.getContractFactory('RuRapGame');
  const gameContract = await gameContractFactory.deploy(names, images, hpValues, attackValues, ...raidBoss);
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);

  let txn;
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();


};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
