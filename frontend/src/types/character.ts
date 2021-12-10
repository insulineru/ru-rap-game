import { BigNumber } from "ethers";

export interface ICharacterData {
  name: string,
  imageURI: string,
  hp: BigNumber,
  maxHp: BigNumber,
  attackDamage: BigNumber
}

export interface ICharacter {
  name: string,
  imageURI: string,
  hp: number,
  maxHp: number,
  attackDamage: number
}
