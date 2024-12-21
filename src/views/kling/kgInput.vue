<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui'
import kgInputVideo from './kgInputVideo.vue'
import kgInputImage from './kgInputImage.vue'
</script>

<template>
  <div class="px-2">
    <NTabs type="segment" animated size="small" default-value="video">
      <NTabPane name="video" :tab="$t('video.menu')">
        <kg-input-video />
      </NTabPane>
      <NTabPane name="image" :tab="$t('mjchat.draw')">
        <kg-input-image />
      </NTabPane>
    </NTabs>
  </div>
</template>
