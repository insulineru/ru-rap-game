import { ethers } from 'ethers'
import { CONTRACT_ADDRESS } from '~/constants'
import { abi } from '../../../contract/artifacts/contracts/RuRapGame.sol/RuRapGame.json'

let provider = new ethers.providers.Web3Provider(window.ethereum)
export const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)
let signer = provider.getSigner()
export const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

export const checkIfUserHasNFT = async () => {
  const nft = await contract.checkIfUserHasNFT()
  return nft
}

export const getAllDefaultCharacters = async () => {
  const characters = await readOnlyContract.getAllDefaultCharacters()
  return characters
}

export const mintCharacterNFT = async (id: number) => {
  const mintTxn = await contract.mintCharacterNFT(id)
  await mintTxn.wait()
  return mintTxn
}
