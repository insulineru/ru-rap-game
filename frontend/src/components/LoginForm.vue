<template>
  <img
    width="400"
    src="https://c.tenor.com/AWiqi2IpVBIAAAAC/bbt-baby-tape-dance.gif"
    alt="Dancing Baby Tape"
  />
  <button
    class="bg-purple-600 text-gray-50 mt-3 p-3 rounded-lg"
    @click="connectWallet"
  >Подключить кошелёк</button>
</template>

<script lang="ts" setup>
const emit = defineEmits(['setAccount'])
const connectWallet = async () => {
  try {
    const { ethereum } = window

    if (!ethereum) {
      alert('Get MetaMask!')
      return
    }

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    emit('setAccount', accounts[0])
    console.log('Connected', accounts[0])

  } catch (error) {
    console.log(error)
  }
}
</script>
