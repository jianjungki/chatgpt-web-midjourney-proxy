<script setup lang="ts">
import { ref } from 'vue'
import { NTabPane, NTabs } from 'naive-ui'
import { useRoute } from 'vue-router'
import McInput from './mcInput.vue'
import mcList from './mcList.vue'
import mcplayer from './mcplayer.vue'

import udioInput from './udioInput.vue'
import udioList from './udioList.vue'
import { gptServerStore } from '@/store'

const route = useRoute() // 获取当前路由对象
const st = ref({ menu: 'suno', tab: '' })

const handleUpdateValue = (v: string) => {
  // mlog("handleUpdateValue",v)
  gptServerStore.setMyData({ TAB_MUSIC: v })
}

const initLoad = () => {
  if (route.query.tab) {
    st.value.tab = 'suno'
    const tt = (route.query.tab as string).toLocaleLowerCase()
    if (['suno', 'udio'].includes(tt))
      st.value.tab = tt

    handleUpdateValue(st.value.tab)
  }
  else { st.value.tab = (gptServerStore.myData.TAB_MUSIC ? gptServerStore.myData.TAB_MUSIC : 'suno') }
}
initLoad()
</script>

<template>
  <div class="flex w-full h-full   ">
    <div class="w-[300px] h-full  overflow-y-auto ">
      <NTabs type="line" animated :default-value="gptServerStore.myData.TAB_MUSIC ?? 'suno'" @update:value="handleUpdateValue">
        <NTabPane name="start" tab="">
          <McInput />
        </NTabPane>

        <NTabPane name="suno" tab="Suno">
          <McInput />
        </NTabPane>
        <NTabPane name="udio" tab="Udio">
          <udioInput />
        </NTabPane>
      </NTabs>
    </div>
    <div class=" flex-1  h-full bg-[#fafbfc] pt-2 dark:bg-[#18181c] overflow-y-auto ">
      <udioList v-if="gptServerStore.myData.TAB_MUSIC == 'udio'" />
      <mcList v-else />
    </div>
    <div class="w-[300px]  h-full overflow-y-auto ">
      <mcplayer />
    </div>
  </div>
</template>
