<script setup lang="ts">
import { NTag } from 'naive-ui'
import { ref } from 'vue'
import { mlog } from '@/api'
import { FeedTask, sleep, sunoFetch } from '@/api/suno'

const fsRef = ref()
const st = ref({ process: '', id: '', isUpload: false })

const uploadFetch = async (lid: string) => {
  for (let i = 0; i < 50; i++) {
    const dt: any = await sunoFetch(`/uploads/audio/${lid}`)
    mlog('ddd', dt)
    let time = (i + 1)
    if (time > 20)
      time = 20
    if (dt.status == 'complete' || dt.status == 'error')
      return dt
    await sleep(time * 1000)
  }
  return null
}
async function selectFile(input: any) {
  try {
    st.value.isUpload = true
    mlog('uploadFile', input.target.files[0])
    const fileName = input.target.files[0].name
    const extension = fileName.split('.').pop()

    const d: any = await sunoFetch('/uploads/audio', { extension: extension || 'mp3' })
    mlog('init ', d)
    st.value.id = d.id
    const formData = new FormData()
    for (const p in d.fields)
      formData.append(p, d.fields[p])

    formData.append('file', input.target.files[0])
    const response = await fetch(d.url, { method: 'POST', body: formData })
    if (!response.ok)
      throw new Error('Network response was not ok')

    mlog('uploaded ')
    const f: any = await sunoFetch(`/uploads/audio/${d.id}/upload-finish`, { upload_type: 'file_upload', upload_filename: input.target.files[0].name })
    mlog('finish ', f)

    const fd: any = await uploadFetch(d.id)
    mlog('uploadFetch ', fd)
    const ft: any = await sunoFetch(`/uploads/audio/${d.id}/initialize-clip`, { })
    mlog('clip ', ft)

    // 到这里拿到 就可以结束了
    FeedTask([ft.clip_id])
  }
  catch (e) {

  }
  st.value.isUpload = false
  fsRef.value.value = ''
}
</script>

<template>
  <NTag type="success" size="small" round>
    <span v-if="st.isUpload" class="cursor-pointer">Upload...</span>
    <span v-else class="cursor-pointer" @click="fsRef.click()">{{ $t('suno.upMps') }}</span>
  </NTag>

  <input ref="fsRef" type="file" style="display: none" accept=".mp3,audio/*,.m4a,.mp4" @change="selectFile">
</template>
