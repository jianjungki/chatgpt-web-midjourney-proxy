<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import KlingInput from '../kling/kgInput.vue'
import LumaInput from './lumaInput.vue'
import RunwayInput from './runInput.vue'
import PikaInput from './pikaInput.vue'
import { mlog } from '@/api'
import { gptServerStore } from '@/store'

const route = useRoute() // 获取当前路由对象

const st = ref({ tab: '' })
const handleUpdateValue = (v: string) => {
  mlog('handleUpdateValue', v)
  gptServerStore.setMyData({ TAB_VIDEO: v })
}

const initLoad = () => {
  if (route.query.tab) {
    // st.value.tab=route.query.tab as string;
    st.value.tab = 'luma'
    const tt = (route.query.tab as string).toLocaleLowerCase()
    if (['luma', 'runway', 'pika', 'kling'].includes(tt))
      st.value.tab = tt

    handleUpdateValue(st.value.tab)
  }
  else { st.value.tab = (gptServerStore.myData.TAB_VIDEO ? gptServerStore.myData.TAB_VIDEO : 'Luma') }
  if (st.value.tab == 'runwayml')
    st.value.tab = 'runway'
}
initLoad()
</script>

<template>
  <NTabs type="line" animated :default-value="st.tab" @update:value="handleUpdateValue">
    <NTabPane name="" tab="" />
    <NTabPane name="luma" tab="Luma">
      <LumaInput />
    </NTabPane>
    <NTabPane name="runway" tab="Runway">
      <RunwayInput />
    </NTabPane>
    <NTabPane name="pika" tab="Pika">
      <PikaInput />
    </NTabPane>
    <NTabPane name="kling" :tab="$t('mj.kling')">
      <KlingInput />
    </NTabPane>
  </NTabs>
</template>
