<script setup lang="ts">
// import {  NLayoutSider } from 'naive-ui';
import { NDrawer, NDrawerContent } from 'naive-ui'
import { computed, ref } from 'vue'
import aiDrawInput from './aiDrawInput.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
// import { SvgIcon } from '@/components/common';
import { homeStore } from '@/store'

const pp = defineProps<{ buttonDisabled: boolean }>()

const $emit = defineEmits(['drawSent', 'close'])

// import { homeStore } from '@/store';
const { isMobile } = useBasicLayout()

const st = ref({ show: false })
const handleUpdateCollapsed = (value: boolean) => {
  console.log(value)
}
const isLoading = computed(() => {
  return pp.buttonDisabled
})
function drawSent(e: any) {
  st.value.show = false
  $emit('drawSent', e)
  homeStore.setMyData({ act: 'draw', actData: e })
}
// watch( ()=>homeStore.myData.act, (act) => {
//   act=='newtask' && (st.value.show=true);
//   act=='same2' && (st.value.show=true);
// });
</script>

<template>
  <div v-if="isMobile">
    <!-- <div class="fixed right-[30px] bottom-[70px] z-10">
    <n-button  type="warning" circle size="large" @click="st.show=true">
      <template #icon>
        <SvgIcon icon="ic:round-add"></SvgIcon>
      </template>
    </n-button>
    </div> -->
    <NDrawer v-model:show="st.show" :height="565" placement="bottom">
      <NDrawerContent style="--n-body-padding:0" class="h-full">
        <aiDrawInput :button-disabled="isLoading" @draw-sent="drawSent" />
      </NDrawerContent>
    </NDrawer>
  </div>
  <section v-else class="h-full overflow-auto w-[300px]" @update-collapsed="handleUpdateCollapsed">
    <!-- <div class="h-full w-full">
     <aiDrawInput class="p-4"/>
   </div> -->
    <div class="h-full w-full">
      <aiDrawInput :button-disabled="isLoading" @draw-sent="drawSent" />
    </div>
  </section>
</template>
