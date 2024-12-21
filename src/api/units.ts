import { homeStore } from '@/store'

export const checkDisableGpt4 = (model: string) => {
  if (!homeStore.myData.session.disableGpt4 || homeStore.myData.session.disableGpt4 != '1')
    return false
  const rz = model.includes('gpt-4')
  if (rz)
    homeStore.setMyData({ isLoader: false, act: 'stopLoading' })

  return rz
}

export const isApikeyError = (text: string) => {
  text = text.toLocaleLowerCase()
  if (
    text.indexOf('error') && (
      text.includes('无效的令牌') // one-api 错误
    || text.includes('incorrect api key') // 原生
    || text.includes('key error')
    ))
    return true
  return false
}
export const isAuthSessionError = (text: string) => {
  text = text.toLocaleLowerCase()
  if (text.includes('token_check'))
    return true
  return false
}
