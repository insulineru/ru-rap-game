<template>
  <div class="justify-center flex flex-col items-center">
    <div text-4xl inline-block>👋🏻</div>
    <p>⚔️ Русская рэп игра ⚔️</p>
    <p>Legendary!</p>
    <login-form v-if="!currentAccount" @set-account="setAccount" />
    <select-character v-else-if="!userNft && !isLoading" />
  </div>
</template>

<script setup lang="ts">
import { checkIfUserHasNFT } from '~/core/contract'
import { transformCharacterData } from '~/utils/transformCharacterData'
import { ICharacter } from '~/types/character'
import { contract } from '~/core/contract'
import { BigNumber } from 'ethers'

const currentAccount = ref('')
const userNft = ref<ICharacter | null>(null)
const isLoading = ref(false)

const checkIfWalletIsConnected = async () => {
  try {
    isLoading.value = true
    const { ethereum } = window
    if (!ethereum) {
      console.log("Make sure you have metamask!")
      return
    } else {
      console.log("We have the ethereum object", ethereum)
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log("Found an authorized account:", account)
      setAccount(account)
    } else {
      console.log("No authorized account found")
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const setAccount = async (value: string) => {
  isLoading.value = true
  currentAccount.value = value

  if (value) {
    console.log('Checking for Character NFT on address:', value)
    const txn = await checkIfUserHasNFT()
    if (txn.name) {
      console.log('User has character NFT')
      userNft.value = transformCharacterData(txn)
    } else {
      console.log('No character NFT found')
    }
  }

  isLoading.value = false
}

const onCharacterMint = async (sender: string, tokenId: BigNumber, characterIndex: BigNumber) => {
  isLoading.value = true
  console.log(
    `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
  )

  const characterNFT = await checkIfUserHasNFT()
  console.log('CharacterNFT: ', characterNFT)
  userNft.value = transformCharacterData(characterNFT)
  isLoading.value = false
}

onMounted(async () => {
  await checkIfWalletIsConnected()
  contract.on('CharacterNFTMinted', onCharacterMint)
})

onBeforeUnmount(() => {
  contract.off('CharacterNFTMinted', onCharacterMint)
})
</script>
