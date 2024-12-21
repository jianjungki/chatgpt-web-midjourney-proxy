<script setup lang="ts">
import { NDrawer, NDrawerContent, NInput } from 'naive-ui'
import { ref, watch } from 'vue'
import AiGptsCom from './aiGptsCom.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { homeStore } from '@/store'
import { SvgIcon } from '@/components/common'
const { isMobile } = useBasicLayout()
const qref = ref()
const st = ref({ showImg: false, q: '' })
watch(() => homeStore.myData.act, (n) => {
  if (n == 'showgpts')
    st.value.showImg = true
})
const search = () => {
  if (!st.value.q)
    return
  qref.value.searchQ(st.value.q)
}
const toq = (d: any) => {
  st.value.q = d.q
}
</script>

<template>
  <NDrawer v-model:show="st.showImg" :placement="isMobile ? 'bottom' : 'right'" :class="isMobile ? ['!h-[90vh]'] : ['!w-[80vw]']" style="--n-body-padding:0">
    <NDrawerContent class="mydrawer" :closable="isMobile">
      <template #header>
        <div class="flex justify-between items-center w-full">
          <!-- <SvgIcon icon="uil:search" class="pr-2 text-[28px] cursor-pointer"></SvgIcon> GPT store -->
          <div class="pr-4">
            GPT store
          </div>
          <div class=" max-w-[400px]">
            <NInput v-model:value="st.q" round :placeholder="$t('mjchat.searchPlaceholder')" clearable @keydown.enter="search()">
              <template #prefix>
                <SvgIcon icon="uil:search" />
              </template>
              <template #suffix>
                <div class="cursor-pointer" @click="search()">
                  {{ $t('mjchat.search') }}
                </div>
              </template>
            </NInput>
          </div>
        </div>
      </template>
      <AiGptsCom ref="qref" :q="st.q" @close="st.showImg = false" @toq="toq" />
    </NDrawerContent>
  </NDrawer>
</template>

<style>
.mydrawer .n-drawer-header__main{
 @apply flex-1;
}
</style>
