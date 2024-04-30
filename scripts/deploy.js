async function main() {
  const token = await ethers.deployContract("MetaWallet");
  console.log("Deployed Contract Address:", await token.getAddress());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});