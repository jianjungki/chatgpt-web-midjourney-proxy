<script setup lang="ts">
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
// import { ajax } from '@/api'
import { nextTick, ref } from 'vue'
import { NEmpty, NImage, NSpin, NTag } from 'naive-ui'
// import {copyText3} from "@/utils/format";
// import { copyText } from 'vue3-clipboard'
// import { copyToClip } from "@/utils/copy";
// import AiMsg from "@/views/aidutu/aiMsg.vue";
import { homeStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
// import { ViewCard } from 'vue-waterfall-plugin-next/dist/types/types/waterfall'
import { getMjAll, loadGallery, localGet, mlog, url2base64 } from '@/api'

const emit = defineEmits(['close'])

const chatStore = useChatStore()

const { isMobile } = useBasicLayout()

// import {hom}

const st = ref({ show: true, showImg: '', isLoad: false })

const showImg = ref<typeof NImage>()

const list = ref<any[]>([])

const breakpoints = {
  2000: { // 当屏幕宽度小于等于1200
    rowPerView: 6,
  },
  1600: { // 当屏幕宽度小于等于1200
    rowPerView: 5,
  },
  1200: { // 当屏幕宽度小于等于1200
    rowPerView: 4,
  },
  800: { // 当屏幕宽度小于等于800
    rowPerView: 3,
  },
  500: { // 当屏幕宽度小于等于500
    rowPerView: 2,
  },
}

const loadImg = () => {
  // mlog('local',homeStore.myData.session.isApiGallery );
  if (homeStore.myData.session.isApiGallery)
    loadApiGallery()
  else loadImagFormLocal()
}

const loadApiGallery = async () => {
  st.value.isLoad = true
  const d = await loadGallery()
  mlog('loadApiGallery', d)
  st.value.isLoad = false
  if (!d || d.length == 0)
    return
  const rz = d.map((v: any) => {
    return {
      mjID: v.id,
      src: v.imageUrl,
      isLoad: 0,
      prompt: v.prompt,
      image_url: v.imageUrl,
      action: v.action,
      time: v.startTime,
    }
  })
  for (const i in rz) {
    const v = rz[i]
    try {
      if (v.image_url) {
        // await loadImg(chat.value.opt?.imageUrl);
        const key = `img:${v.mjID}`
        const base64 = await localGet(key)
        if (!base64) {
          url2base64(v.image_url, key).then((v: any) => {
            mlog('图片已保存>>', key)
          })
        }
        else {
          rz[i].image_url = rz[i].src = base64
        }
      }
    }
    catch (error) {
      mlog('图片保存失败', error)
    }
  }

  list.value = rz.sort((a: any, b: any) => (b.time - a.time))
}

const loadImagFormLocal = async () => {
  const d = await getMjAll(chatStore.$state)
  if (!d || d.length == 0)
    return
  // mlog('loadImg', d );

  const rz = d.filter((v: any) => v.opt && v.opt.imageUrl).map((v: any) => {
    // mlog('vv', v.opt.imageUrl);
    // let key= 'img:'+v.mjID;
    //  let base64 = await loca(key );
    return {
      mjID: v.mjID,
      src: v.opt.imageUrl,
      isLoad: 0,
      prompt: v.opt.promptEn,
      image_url: v.opt.imageUrl,
      action: v.opt.action,
      time: v.opt.startTime,
    }
  })
  list.value = []
  for (const v of rz) {
    const key = `img:${v.mjID}`
    try {
      const base64 = await localGet(key)
      if (base64)
        v.image_url = base64
    }
    catch (e) { }
    list.value.push(v)
  }

  // list.value

  // ajax({  url: '/chatgpt/mj/gallery' })
  //     .then((d) => {
  //         // st.value.style= d.data.style
  //         // st.value.example= d.data.example
  //         console.log(d)
  //         list.value= d.data.images.map((v:any)=>{
  //             v.isLoad=0
  //             return  v;
  //         })
  //     } )
}
const goShow = (item: any) => {
  // console.log('goShow', isMobile );
  if (isMobile.value)
    return
  st.value.show = true
  st.value.showImg = item.image_url
  // console.log('goShow', item);
  nextTick(() => showImg.value?.click())
}
// function copy( item:any){
//   //console.log('copy', item.prompt );
// 	//copyText3(  item.prompt ).then(()=>msgRef.value.showMsg('复制成功！'));
//   homeStore.setMyData({act:'copy',actData: {text: item.prompt } });
// 	//copyToClip(  item.prompt ).then(()=>msgRef.value.showMsg('复制成功！'));
// }

// 画同款
const same = (item: any, act: string) => {
  // console.log('same',item);
  homeStore.setMyData({ act, actData: JSON.parse(JSON.stringify(item)) }) // :'same'
  emit('close')
}
loadImg()
</script>

<template>
  <Waterfall v-if="list.length" :list="list" :breakpoints="breakpoints" class=" !bg-transparent">
    <template #item="{ item, url, index }">
      <div class="bg-white dark:bg-[#24272e] rounded-md   overflow-hidden cursor-pointer group/item relative">
        <LazyImg :url="item.image_url" @success="item.isLoad = 1" @click="goShow(item)" />
        <!-- <LazyImg :url="item.image_hd_url"  @success="item.isLoad=1" /> -->
        <div v-if="item.isLoad == 0" class="absolute top-0 left-0 right-0 bottom-0">
          <div class="flex justify-center items-center w-full h-full">
            <NSpin size="large" />
          </div>
        </div>
        <div class="absolute w-full bottom-0   backdrop-blur-sm text-white/70 invisible group-hover/item:visible ">
          <div class="p-3">
            <div class="line-clamp-2 text-[13px]">
              <template v-if="item.prompt">
                {{ item.prompt }}
              </template>
              <NTag v-else-if="item.action == 'SWAP_FACE'" type="success" size="small" round v-html="$t('mjchat.face')" />
              <NTag v-else-if="item.action == 'BLEND'" type="success" size="small" round v-html="$t('mjchat.blend')" />
              <NTag v-else type="success" size="small" round>
                {{ item.action }}
              </NTag>
            </div>
            <div class="line-clamp-1 text-[12px] text-right">
              {{ new Date(item.time).toLocaleString() }}
            </div>
            <div class="space-x-2">
              <!-- <NButton type="primary" size="small" @click="copy(item )" >复制</NButton> -->

              <!-- <NButton type="primary" size="small" @click="same(item,'same2' )" >引用</NButton>
                <NButton type="primary" size="small"  @click="same(item,'same' )">画同款</NButton> -->
            </div>
          </div>
        </div>
      <!-- <p class="text">这是具体内容</p> -->
      </div>
    </template>
  </Waterfall>
  <div v-else-if="st.isLoad" class="w-full h-full flex justify-center items-center">
    <NSpin size="large" />
    <div>Loading....</div>
  </div>
  <div v-else class="w-full h-full flex justify-center items-center">
    <NEmpty :description="$t('mjchat.noproduct')" />
  </div>

  <NImage v-if="st.showImg" ref="showImg" :src="st.showImg" :width="1" />
  <!-- <NButton type="primary" size="small" @click="copy2('abdd' )" >复制</NButton> -->

<!-- <div @click="copy2('abdd' )">复制测试</div> -->
</template>

<style>
.lazy__img[lazy=loading] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy=loaded] {
  width: 100%;
}

.lazy__img[lazy=error] {
  padding: 5em 0;
  width: 48px;
}
</style>
