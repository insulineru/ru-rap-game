<template>
  <div class="justify-center flex flex-col items-center">
    <div text-4xl inline-block>👋🏻</div>
    <p>⚔️ Русская рэп игра ⚔️</p>
    <p>Legendary!</p>
    <login-form v-if="!currentAccount" @set-account="setAccount" />
    <select-character v-else-if="!userNft" />
  </div>
</template>

<script setup lang="ts">
const currentAccount = ref('')
const userNft = ref(null)

const checkIfWalletIsConnected = async () => {
  try {
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
      currentAccount.value = account
    } else {
      console.log("No authorized account found")
    }
  } catch (error) {
    console.log(error)
  }
}

const setAccount = (value: string) => {
  currentAccount.value = value;
}

onMounted(async () => {
  await checkIfWalletIsConnected()
})
</script>
