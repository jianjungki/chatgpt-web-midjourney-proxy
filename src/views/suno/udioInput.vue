<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { NButton, NImage, NInput, NRadioButton, NRadioGroup, NSelect, NSlider, NTag, useMessage } from 'naive-ui'
import { t } from '@/locales'
import { udioFeedTask, udioFetch } from '@/api/udio'
import { mlog } from '@/api'
import { SvgIcon } from '@/components/common'
import { homeStore } from '@/store'
import type { udioTask } from '@/api/udioStore'

const f = ref({ lyrics_type: 'generate', prompt: '', lyrice: '', model: 'udio32-v1.5', continue_clip_id: '', continue_at: 0, mode: 'continuation' })
const st = ref({ loading: false })
const exSuno = ref<udioTask>()

const lyriceConfig = [
  { key: 'user', value: t('mj.ud_ly_write') },
  { key: 'generate', value: t('mj.ud_ly_auto') },
  { key: 'instrumental', value: t('mj.ud_ly_null') },

// {key:'user',value:'Write Lyrics'},
// {key:'generate',value:'Auto'},
// {key:'instrumental',value:'Instrumental'},
]

const modelConfig = [
  { label: `Model: udio-32 ${t('mj.ud_v32')}`, value: 'udio32-v1.5' },
  { label: `Model: udio-130 ${t('mj.ud_v130')}`, value: 'udio130-v1.5' },
]
const modeConfig = [
  { label: t('mj.ud_precede'), value: 'precede' },
  { label: t('mj.ud_continuation'), value: 'continuation' },
]

const input = {
  gen_params: {
    prompt: '',
    lyrics: '',
    lyrics_type: 'generate',
    bypass_prompt_optimization: false,
    seed: -1,
    song_section_start: 0.4,
    prompt_strength: 0.5,
    clarity_strength: 0.25,
    lyrics_strength: 0.5,
    generation_quality: 0.75,
    negative_prompt: '',
    model_type: '',
    config: {
      mode: 'regular',
    },
  },
}

const generate = async () => {
  st.value.loading = true
  const data = { ...input }
  data.gen_params.prompt = f.value.prompt
  data.gen_params.model_type = f.value.model
  data.gen_params.lyrics_type = f.value.lyrics_type
  if (f.value.lyrics_type == 'user')
    data.gen_params.lyrics = f.value.lyrice

  if (f.value.continue_clip_id) {
    data.gen_params.song_section_start = f.value.continue_at
    data.gen_params.config = {
      mode: f.value.mode,
      context_length: 130,
      source: {
        source_type: 'song',
        song_id: f.value.continue_clip_id,
      },
    }
  }
  try {
    const d = await udioFetch('/udio/submit/music', data)
    mlog('generate', d)
    if (d.data)
      udioFeedTask(d.data)
  }
  catch (error) {

  }
  st.value.loading = false
}

const canPost = computed(() => f.value.prompt != '')

watch(() => homeStore.myData.act, (n) => {
  if (n == 'udio.extend') {
    mlog('udio.extend', homeStore.myData.actData)
    const s = homeStore.myData.actData as udioTask
    exSuno.value = s
    f.value.continue_clip_id = s.id
    f.value.continue_at = 0.4
  }
})
const ms = useMessage()
onMounted(() => {
  homeStore.setMyData({ ms })
})
</script>

<template>
  <div class="p-1">
    <div>
      <!-- <n-input :placeholder="$t('mj.ud_prompt_pls')" v-model:value="f.prompt">
        <template #prefix>
                <span>{{$t('mj.ud_prompt')}}：</span>
        </template>
        </n-input> -->
      <NInput
        v-model:value="f.prompt"
        :placeholder="$t('mj.ud_prompt_pls')" type="textarea" size="small"
        :autosize="{ minRows: 3, maxRows: 12 }"
      />
    </div>
    <div class="pt-4">
      <NRadioGroup v-model:value="f.lyrics_type" name="radiobuttongroup1" size="small">
        <NRadioButton v-for="song in lyriceConfig" :key="song.key" :value="song.key" :label="song.value" />
      </NRadioGroup>
    </div>
    <div v-if="f.lyrics_type == 'user'" class="pt-1">
      <NInput
        v-model:value="f.lyrice"
        :placeholder="$t('suno.lypls')" type="textarea" size="small"
        :autosize="{ minRows: 5, maxRows: 12 }"
      />
    </div>

    <div class="pt-4">
      <NSelect v-model:value="f.model" :options="modelConfig" size="small" />
    </div>

    <div class="pt-4">
      <div class="flex justify-end items-start">
        <NButton :loading="st.loading" type="primary" :disabled="!canPost" @click="generate()">
          <SvgIcon icon="ri:music-fill" /> {{ $t('suno.generate') }}
        </NButton>
      </div>
    </div>

    <template v-if="f.continue_clip_id && exSuno">
      <div class="pt-5">
        <div class="flex justify-between pb-3">
          <div class="text-[12px]">
            {{ $t('suno.extendAt') }} {{ f.continue_at * 100 }}%
          </div>
          <NTag type="success" size="small" round>
            <span class="cursor-pointer" @click="f.continue_clip_id = ''">清除</span>
          </NTag>
        </div>
        <NSlider v-model:value="f.continue_at" :step="0.01" :max="1">
          <template #thumb>
            <div class="bg-[--n-fill-color] text-[9px]  border-[0px]  px-1 list-none rounded-md">
              {{ f.continue_at }}
            </div>
          </template>
        </NSlider>
      </div>
      <div class="pt-1 flex justify-end">
        <NRadioGroup v-model:value="f.mode" name="radiobuttongroup1" size="small">
          <NRadioButton v-for="song in modeConfig" :key="song.value" :value="song.value" :label="song.label" />
        </NRadioGroup>
      </div>
      <div class="pt-1">
        <div class="flex relative  justify-between items-start p-2 hover:dark:bg-black hover:bg-gray-200 border-b-[1px] border-gray-500/10 ">
          <div class="w-[60px] h-[60px] relative  cursor-pointer">
            <NImage lazy width="100" :src="exSuno.image_path" preview-disabled>
              <template #placeholder>
                <div class="w-full h-full justify-center items-center flex">
                  <SvgIcon icon="line-md:downloading-loop" class="text-[40px] text-green-300" />
                </div>
              </template>
            </NImage>
          </div>
          <div class="flex-1  pl-2">
            <div class="flex justify-between line-clamp-1 w-full cursor-pointer">
              <h3>{{ exSuno.title }}</h3>
              <!-- <div class="opacity-80"  >{{exSuno.metadata.tags}}</div> -->
            </div>
            <div v-if="exSuno.lyrics || exSuno.prompt" class="opacity-60 line-clamp-1 w-full text-[12px] cursor-pointer">
              {{ exSuno.lyrics || exSuno.prompt }}
            </div>
            <div v-else class="opacity-60 line-clamp-1 w-full text-[12px] cursor-pointer">
              {{ $t('suno.noly') }}
            </div>
            <div class="text-right text-[14px] flex justify-end items-center space-x-2  ">
              <template v-if=" exSuno.duration">
                <div class="text-[8px] flex items-center border-[1px] border-gray-500/30 px-1 list-none rounded-md">
                  {{ exSuno.duration.toFixed(1) }}s
                </div>
              </template>
              <!-- <div class="text-[8px] flex items-center border-[1px] border-gray-500/30 px-1 list-none rounded-md" v-if="exSuno.major_model_version"> {{exSuno.major_model_version}}</div> -->
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="pt-4 px-2 text-[12px]" v-html="t('mj.ud_info')" />
  </div>
</template>
