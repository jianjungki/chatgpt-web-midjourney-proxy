<script setup lang="ts">
import { NButton, NButtonGroup, NEmpty, NPopconfirm, NPopover, useMessage } from 'naive-ui'
import { ref, watch } from 'vue'
import type { RunwayMlTask } from '@/api/runwaymlStore'
import { RunwayMlStore } from '@/api/runwaymlStore'
import { runwayMlFeedById } from '@/api/runwayml'
import { t } from '@/locales'
import { SvgIcon } from '@/components/common'
import { homeStore } from '@/store'

// runwayml.feed
const ms = useMessage()
const st = ref({ pIndex: -1 })
const list = ref<RunwayMlTask[]>([])
const csuno = new RunwayMlStore()
const initLoad = () => {
  const arr = csuno.getObjs()
  list.value = arr.reverse()
}

const deleteGo = (item: RunwayMlTask) => {
  // ..mlog('deleteGo',item )
  if (csuno.delete(item)) {
    ms.success(t('common.deleteSuccess'))
    initLoad()
  }
}

watch(() => homeStore.myData.act, (n) => {
  if (n == 'runwayml.feed')
    initLoad()
})

initLoad()
</script>

<template>
  <div v-if="list.length > 0" class="p-4">
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(item, index) in list" :key="index" class="relative" @mousemove="st.pIndex = index" @mouseout="st.pIndex = -1">
        <div class="relative flex items-center justify-center bg-white bg-opacity-10 rounded-[16px] overflow-hidden aspect-[16/8.85] ">
          <template v-if="item.status == 'SUCCEEDED' && item.output && item.output.length > 0 ">
            <video :src="item.output[0]" loop playsinline :controls="st.pIndex == index" class="w-full h-full object-cover" />
          </template>
          <div v-else class=" text-center">
            <div v-if="item.status == 'FAILED'">
              {{ $t('video.failed') }}
              <div class="p-2" v-text="item.failure" />
            </div>
            <NButton v-else-if="!item.last_feed || ((new Date().getTime()) - item.last_feed) > 20 * 1000" size="small" type="primary" @click="runwayMlFeedById(item.id)">
              {{ $t('video.repeat') }}
            </NButton>
            <div v-else class="pt-2">
              <div>{{ $t('video.process') }}{{ new Date(item.last_feed).toLocaleString() }}</div>
              <div>Status: {{ item.status }}</div>
              <!-- <div v-if="item.state=='processing'">{{ $t('video.processing') }}</div>  -->
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div>
            <NPopover trigger="hover">
              <template #trigger>
                <div class="line-clamp-1">
                  {{ item.promptText }}
                </div>
              </template>
              <div v-if="item.id">
                ID: {{ item.id }}
              </div>
              <div v-if="item.createdAt">
                createdAt: {{ new Date(item.createdAt).toLocaleString() }}
              </div>

              <div class=" max-w-[300px]">
                {{ item.promptText }}
              </div>
            </NPopover>
          </div>
          <div v-if="item.status == 'SUCCEEDED' || item.status == 'FAILED' " class="flex justify-end items-center pt-1">
            <NButtonGroup size="tiny">
              <NButton v-if="item.status == 'SUCCEEDED'" size="tiny" round ghost>
                <a :href="item.output[0]" target="_blank" class="flex"><SvgIcon icon="mdi:download" /> {{ $t('video.download') }} </a>
              </NButton>
              <NButton size="tiny" round ghost>
                <NPopconfirm placement="bottom" @positive-click="() => deleteGo(item)">
                  <template #trigger>
                    <div class=" cursor-pointer">
                      <SvgIcon icon="mdi:delete" />
                    </div>
                  </template>
                  {{ $t('mj.confirmDelete') }}
                </NPopconfirm>
              </NButton>
              <!-- <n-button   size="tiny"  round ghost  @click="extend( item )"  ><SvgIcon icon="ri:video-add-line" /> {{ $t('video.extend') }}</n-button> -->
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
