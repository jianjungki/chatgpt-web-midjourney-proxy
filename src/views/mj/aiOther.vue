<script setup lang="ts">
import { watch } from 'vue'
import { homeStore, useChatStore } from '@/store'

const chatStore = useChatStore() // const chatStore = useChatStore()
// const dataSources = computed(() => chatStore.getChatByUuid(+uuid))
watch(() => homeStore.myData.local, (n) => {
  if (!chatStore.active)
    return
  const dataSources = chatStore.getChatByUuid(+chatStore.active)
  if (dataSources.length > 0)
    chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
})
</script>

<template />
