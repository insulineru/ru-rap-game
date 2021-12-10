<template>
  <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
    <div class="space-y-12">
      <div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
        <h2
          class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl"
        >Выберите персонажа. Выбирайте с умом 📌</h2>
      </div>
      <ul
        role="list"
        class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
      >
        <li
          v-for="(character, index) in characters"
          :key="index"
          class="pt-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left"
        >
          <div class="space-y-6 xl:space-y-10">
            <img
              class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
              :src="character.imageURI"
              :alt="character.name"
            />
            <div class="space-y-2 xl:flex xl:items-center xl:justify-between">
              <div class="font-medium text-lg leading-6 space-y-1 text-center">
                <h3 class="text-white">{{ character.name }}</h3>
                <p
                  class="text-indigo-400"
                >HP: {{ character.hp }}, Damage: {{ character.attackDamage }}</p>
                <button
                  class="bg-purple-600 text-gray-50 mt-3 p-3 rounded-lg"
                  @click="mint(index)"
                >Окей, лессгоу минтить!</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { transformCharacterData } from '~/utils/transformCharacterData'
import { getAllDefaultCharacters, mintCharacterNFT } from '~/core/contract'
import { ICharacterData } from '~/types/character'
const characters = ref<ICharacterData[]>([])

onMounted(async () => {
  try {
    console.log('Getting contract characters to mint')

    const charactersTxn = await getAllDefaultCharacters()
    console.log('charactersTxn:', charactersTxn)

    characters.value = charactersTxn.map((characterData: ICharacterData) =>
      transformCharacterData(characterData)
    )
  } catch (error) {
    console.error('Something went wrong fetching characters:', error)
  }
})

const mint = async (index: number) => {
  const res = await mintCharacterNFT(index)
  console.log(res)
}
</script>
