const main = async () => {
  const names = ["OG Buda", "MAYOT", "Scally Milano"];
  const images = ["https://pbs.twimg.com/media/EN7qq_bX0AAIok2.jpg", "https://www.songslyrics.ru/wp-content/uploads/2021/07/Mayot-5.jpg", "https://sun9-18.userapi.com/impg/qvXDo4ycsWuJ7SleRsyvM5u8lAsJX1jzETVr7Q/QHuv4sqU85w.jpg?size=1490x1920&quality=96&sign=e63d1ceae4408db948f6119ca18dc22a&type=album"];
  const hpValues = [2000, 2000, 2002];
  const attackValues = [200, 180, 159];
  const gameContractFactory = await hre.ethers.getContractFactory('RuRapGame');
  const gameContract = await gameContractFactory.deploy(names, images, hpValues, attackValues);
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
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
