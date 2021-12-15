<template>
  <h3>Arena 🏹</h3>

  <div class="flex justify-around items-center w-3/6">
    <div class="space-y-6 xl:space-y-10" v-if="boss">
      <img
        class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
        :src="boss.imageURI"
        :alt="boss.name"
      />
      <div class="space-y-2 xl:flex xl:items-center xl:justify-between">
        <div class="font-medium text-lg leading-6 space-y-1 text-center">
          <h3 class="text-white">{{ boss.name }}</h3>
          <p class="text-indigo-400">HP: {{ boss.hp }}, Damage: {{ boss.attackDamage }}</p>
          <b class="text-red-600 font-bold">Boss!</b>
        </div>
      </div>
    </div>
    <button
      class="bg-purple-600 text-gray-50 mt-3 p-3 rounded-lg h-10"
      :class="isLoading && 'pointer-events-none	'"
      @click="attack"
    >Атаковать босса!</button>
    <div class="space-y-6 xl:space-y-10" v-if="props.character">
      <img
        class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
        :src="props.character.imageURI"
        :alt="props.character.name"
      />
      <div class="space-y-2 xl:flex xl:items-center xl:justify-between">
        <div class="font-medium text-lg leading-6 space-y-1 text-center">
          <h3 class="text-white">{{ props.character.name }}</h3>
          <p
            class="text-indigo-400"
          >HP: {{ props.character.hp }}, Damage: {{ props.character.attackDamage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BigNumber } from 'ethers';
import { getRaidBoss, contract, attackBoss } from '~/core/contract';
import { ICharacter } from '~/types/character';
import { transformCharacterData } from '~/utils/transformCharacterData';

const props = defineProps(['character'])
const emit = defineEmits(['updateCharacterHp'])
const boss = ref<ICharacter | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  const raidBoss = await getRaidBoss()
  boss.value = transformCharacterData(raidBoss)
  contract.on('AttackComplete', onAttackComplete)
  isLoading.value = false
})

const onAttackComplete = (newBossHp: BigNumber, newPlayerHp: BigNumber) => {
  const bossHp = newBossHp.toNumber();
  const playerHp = newPlayerHp.toNumber();

  console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`);

  if (boss.value) {
    boss.value = { ...boss.value, hp: bossHp }
    emit('updateCharacterHp', playerHp)
  }
};

const attack = async () => {
  console.log('Attack....')
  isLoading.value = true
  await attackBoss()
  isLoading.value = false
}
</script>
