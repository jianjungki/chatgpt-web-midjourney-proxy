<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { NButton, NButtonGroup, NEmpty, NPopconfirm, NPopover, useMessage } from 'naive-ui'
import type { LumaMedia } from '@/api/lumaStore'
import { lumaStore } from '@/api/lumaStore'
import { FeedLumaTask, lumaFetch, mlog } from '@/api'
import { homeStore } from '@/store'
import { SvgIcon } from '@/components/common'
import { t } from '@/locales'
// import { myTestTranscode } from '@/api/mp4img';

const st = ref({ pIndex: -1 })
const list = ref<LumaMedia[]>([])
const csuno = new lumaStore()
const ms = useMessage()
const initLoad = () => {
  const arr = csuno.getObjs()
  list.value = arr.reverse()
}
const nowTime = computed(() => {
  return new Date().getTime()
})
const FeedLumaTaskDown = async (item: LumaMedia) => {
  // FeedLumaTask(id)
  const id = item.id
  let url = ''
  try {
    const d: any = await lumaFetch(`/generations/${id}/download_video_url`)
    mlog('d', d)
    url = d.url ?? item.video?.url
  }
  catch (e) {
    url = item.video?.url ?? ''
  }

  // window.open(d.url)
  const link = document.createElement('a')
  link.href = url
  link.download = `${id}.mp4`
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// getLastFrameBase64
const extend = async (item: LumaMedia) => {
  mlog('extend ', item)
  homeStore.setMyData({ act: 'luma.extend', actData: item })
}

watch(() => homeStore.myData.act, (n) => {
  if (n == 'FeedLumaTask')
    initLoad()
})
const deleteGo = (item: LumaMedia) => {
  mlog('deleteGo', item)
  if (csuno.delete(item)) {
    ms.success(t('common.deleteSuccess'))
    initLoad()
  }
}
initLoad()
</script>

<template>
  <div v-if="list.length > 0" class="p-4">
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(item, index) in list" :key="index" class="relative" @mousemove="st.pIndex = index" @mouseout="st.pIndex = -1">
        <div class="relative flex items-center justify-center bg-white bg-opacity-10 rounded-[16px] overflow-hidden aspect-[16/8.85] ">
          <video v-if="item.video?.url || item.video?.download_url" :src="item.video?.download_url ? item.video?.download_url : item.video?.url" loop playsinline :controls="st.pIndex == index" class="w-full h-full object-cover" @error="$event.target.src = item.video?.url" />
          <div v-else class=" text-center">
            <div v-if="item.state == 'failed'" class="pt-2">
              {{ $t('video.failed') }}
            </div>
            <NButton v-else-if="!item.last_feed || ((new Date().getTime()) - item.last_feed) > 20 * 1000" size="small" type="primary" @click="FeedLumaTask(item.id)">
              {{ $t('video.repeat') }}
            </NButton>
            <div v-else class="pt-2">
              <div>{{ $t('video.process') }}{{ new Date(item.last_feed).toLocaleString() }}</div>
              <div v-if="item.state == 'pending'">
                {{ $t('video.pending') }}
              </div>
              <div v-if="item.state == 'processing'">
                {{ $t('video.processing') }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <NPopover trigger="hover">
              <template #trigger>
                <div class="line-clamp-1">
                  {{ item.prompt }}
                </div>
              </template>
              <div v-if="item.id">
                ID: {{ item.id }}
              </div>
              <div v-if="item.created_at">
                createdAt: {{ new Date(item.created_at).toLocaleString() }}
              </div>

              <div class=" max-w-[300px]">
                {{ item.prompt }}
              </div>
            </NPopover>
          </div>
          <div v-if="item.video?.url || item.video?.download_url" class="flex justify-end items-center pt-1">
            <!-- <span    @click="FeedLumaTaskDown( item.id )" class="cursor-pointer" ><SvgIcon icon="mdi:download" /></span> -->

            <NButtonGroup size="tiny">
              <NButton size="tiny" round ghost @click="FeedLumaTaskDown(item)">
                <SvgIcon icon="mdi:download" /> {{ $t('video.download') }}
              </NButton>
              <NButton size="tiny" round ghost>
                <NPopconfirm placement="bottom" @positive-click="() => deleteGo(item)">
                  <template #trigger>
                    <SvgIcon icon="mdi:delete" />
                  </template>
                  {{ $t('mj.confirmDelete') }}
                </NPopconfirm>
              </NButton>
              <NButton size="tiny" round ghost @click="extend(item)">
                <SvgIcon icon="ri:video-add-line" /> {{ $t('video.extend') }}
              </NButton>
            </NButtonGroup>
            <!-- <a :href="item.video?.download_url? item.video?.download_url:item.video?.url" download  target="_blank" v-if="item.video?.url|| item.video?.download_url"  ><SvgIcon icon="mdi:download" class="cursor-pointer"/></a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-full flex justify-center items-center">
    <NEmpty :description="$t('video.nodata')" />
  </div>
</template>
