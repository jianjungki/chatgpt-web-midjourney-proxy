<script setup lang="ts">
import { NAvatar, NPopover } from 'naive-ui'
import type { gptConfigType } from '@/store'
import { SvgIcon } from '@/components/common'

defineProps<{ myItem: Chat.History;myObj?: gptConfigType }>()
</script>

<template>
  <span class="flex justify-start items-center">

    <SvgIcon v-if="!myObj " icon="ri:message-3-line" />
    <NAvatar v-else-if="myObj.gpts" :src="myObj.gpts.logo" fallback-src="../../assets/avatar.jpg" :size="18" round />
    <SvgIcon v-else icon="bi:chat" />
  </span>
  <div class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap">
    <slot />
    <span v-if="!myObj">{{ myItem.title }}</span>
    <NPopover v-else placement="right-start" trigger="hover">
      <template #trigger>
        {{ myItem.title }}
      </template>
      <ul>
        <template v-if="myObj.gpts">
          <li class="flex justify-start items-center space-x-2">
            <NAvatar :src="myObj.gpts.logo" fallback-src="../../assets/avatar.jpg" round />
            <span>{{ myObj.gpts.name }}</span>
          </li>
          <li>ID: {{ myObj.model }}</li>
        </template>
        <li v-else>
          {{ $t('mjset.model') }}: {{ myObj.model }}
        </li>
        <li> {{ $t('mjchat.historyCnt') }}: {{ myObj.talkCount }}</li>
        <li> {{ $t('mjchat.historyTCnt') }}: {{ myObj.max_tokens }}</li>
        <li v-if="myObj.systemMessage">
          {{ $t('mjchat.role') }}: {{ myObj.systemMessage }}
        </li>
      </ul>
    </NPopover>
  </div>
</template>
