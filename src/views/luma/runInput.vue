<script lang="ts" setup>
import { NTabPane, NTabs } from 'naive-ui'

import { ref } from 'vue'
import RunwayInput from './runwayInput.vue'
import RunmlInput from './runmlInput.vue'
import { gptServerStore } from '@/store'
import { mlog } from '@/api'

const st = ref({ tab: 'runway' })
const handleUpdateValue = (v: string) => {
  mlog('handleUpdateValue', v)
  gptServerStore.setMyData({ TAB_VIDEO: v })
}
const initLoad = () => {
  st.value.tab = 'runway'
  if (gptServerStore.myData.TAB_VIDEO == 'runwayml')
    st.value.tab = 'runwayml'
}

initLoad()
</script>

<template>
  <div class="px-2">
    <NTabs type="segment" animated :default-value="st.tab" @update:value="handleUpdateValue">
      <NTabPane name="runway" tab="Website">
        <RunwayInput />
      </NTabPane>
      <NTabPane name="runwayml" tab="API">
        <RunmlInput />
      </NTabPane>
    </NTabs>
  </div>
</template>
