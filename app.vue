<script setup lang="ts">
import { ArcherTrainingCamp } from "./composables/抽象工廠模式AbstractFactory";
import { VedioRoomFacade } from './composables/表現(外觀)模式Facade'
import { BranchOrganizationTest } from './composables/合成模式Composite'
// let ddw = new ArcherTrainingCamp()

// let facade = new VedioRoomFacade()

let composite = new BranchOrganizationTest()
composite.test()
// ddw.trainAdventurer()
</script>
<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
