<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NModal, NTag } from 'naive-ui'
import aiSetServer from './aiSetServer.vue'
import { homeStore } from '@/store'
const pp = defineProps<{ msgInfo?: string }>()
const emit = defineEmits(['close'])
const isHideServer = computed(() => homeStore.myData.session.isHideServer)
const st = ref({ show: false })
const closeed = () => {
  emit('close')
  st.value.show = false
}
</script>

<template>
  <div v-if="!isHideServer || pp.msgInfo" class="whitespace-pre-wrap pb-10">
    <div v-if="pp.msgInfo">
      <div class="p-5 text-center" v-html="pp.msgInfo" />
      <div class="text-center">
        <NButton type="primary" @click="st.show = true">
          {{ $t('setting.setting') }}
        </NButton>
      </div>
    </div>
    <template v-else>
      <span class=" text-red-400">{{ $t('mj.setTextInfo') }} </span> <NTag type="primary" effect="dark" size="small" round style="cursor: pointer; " @click="st.show = true">
        {{ $t('setting.setting') }}
      </NTag>
    </template>
  </div>
  <NModal v-model:show="st.show" :title="$t('mjset.server')" preset="card" style="width: 95%; max-width: 640px">
    <aiSetServer v-if="st.show" @close="closeed" />
  </NModal>
</template>
