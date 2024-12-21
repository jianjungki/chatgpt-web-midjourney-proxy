<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NImage, NSelect, useMessage } from 'naive-ui'
import config from './draw.json'
import { upImg } from '@/api'
import { homeStore } from '@/store'
import { SvgIcon } from '@/components/common'
import { t } from '@/locales'

const ms = useMessage()
const fsRef = ref()
const st = ref({ status: '', isGo: false, dimensions: 'SQUARE' })
const base64Array = ref<string[]>([])
const selectFile = (input: any) => {
  upImg(input.target.files[0]).then((d) => {
    fsRef.value.value = ''
    const index = base64Array.value.findIndex(item => item == d)
    if (index > -1) {
      ms.error(t('mjchat.no2add'))
      return
    }
    base64Array.value.push(d)
    if (base64Array.value.length > 1)
      st.value.isGo = true
    // if(st)
  }).catch(e => ms.error(e))
}
const send = () => {
  if (base64Array.value.length < 2) {
    ms.error(t('mjchat.add2more'))
    return
  }
  const obj = {
    action: 'blend',
    data: {
      base64Array: base64Array.value,
      botType: 'MID_JOURNEY',
      dimensions: st.value.dimensions ? st.value.dimensions : 'SQUARE',
    },
  }
  homeStore.setMyData({ act: 'draw', actData: obj })
  st.value.isGo = false
}
const drawlocalized = computed(() => {
  const localizedConfig = {}
  Object.keys(config).forEach((key) => {
    localizedConfig[key] = config[key].map((option) => {
      // 假设 labelKey 如 "draw.qualityList.general"
      const path = option.labelKey // 直接使用 labelKey 作为路径
      return {
        ...option,
        label: t(path), // 从 i18n 中获取本地化的标签
      }
    })
  })
  return localizedConfig
})
</script>

<template>
  <input ref="fsRef" type="file" style="display: none" accept="image/jpeg, image/jpg, image/png, image/gif" @change="selectFile">
  <section class="mb-4 flex justify-between items-center">
    <div>{{ $t('mjchat.size') }}</div>
    <NSelect v-model:value="st.dimensions" :options="drawlocalized.dimensionsList" size="small" class="!w-[70%]" :clearable="true" />
  </section>
  <div class="flex justify-start items-center flex-wrap myblend">
    <div v-for="item in base64Array" class="w-[var(--my-blend-img-size)] h-[var(--my-blend-img-size)] mr-2 mt-2 bg-[#ddd] overflow-hidden rounded-sm relative group ">
      <NImage :src="item" object-fit="cover" />
      <SvgIcon
        icon="fluent:delete-12-filled"
        class="absolute top-0 right-0 text-red-600 text-[20px] cursor-pointer hidden group-hover:block "
        @click="base64Array.splice(base64Array.indexOf(item), 1)"
      />
    </div>
    <div
      v-if="base64Array.length < 6"
      class="w-[var(--my-blend-img-size)] h-[var(--my-blend-img-size)] mt-2 bg-[#999] overflow-hidden rounded-sm flex justify-center items-center cursor-pointer" @click="fsRef.click()"
    >
      <SvgIcon icon="mdi:add-bold" class="text-[40px] text-[#fff]" />
    </div>
  </div>
  <div class="flex justify-end pt-5">
    <NButton type="primary" :disabled="!st.isGo" @click="send">
      {{ $t('mjchat.blendStart') }}
    </NButton>
  </div>

  <ul class="pt-4" v-html="$t('mjchat.blendInfo')" />
</template>

<style scoped>
.myblend{
    --my-blend-img-size:80px
}
</style>
