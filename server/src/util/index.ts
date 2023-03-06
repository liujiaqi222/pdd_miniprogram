import https from 'https';
import http from 'http'
import type { ReverseResult } from '../types/index.js'


export function reverseShortUrl(url: string): ReverseResult {
  let urlObj: URL
  try {
    urlObj = new URL(url)
  } catch (e) {
    return Promise.resolve({
      success: false,
      error: 'Invalid URL'
    })
  }

  if (!urlObj.protocol.match(/https?:/)) return Promise.resolve({
    success: false,
    error: 'Invalid URL protocol'
  })

  let protocol = urlObj.protocol === 'https:' ? https : http
  return new Promise((resolve) => {
    protocol.get(url, (res) => {
      const { location } = res.headers
      if (location) {
        return resolve({
          longUrl: location,
          headers: res.headers,
          success: true
        })
      }
      resolve({
        success: false,
        error: 'No location header',
        headers: res.headers,
      })

    }).on('error', (error) => {
      resolve({ success: false, error })
    });
  })
}


export const isValidUrl = (url: string): false | string => {
  if (!url) return false
  const reg = /^(http|https):\/\/([\w.]+\/?)\S*/
  if (!reg.test(url)) return false
  const urlObj = new URL(url)
  const { hostname, searchParams } = urlObj
  if (hostname !== 'mobile.yangkeduo.com') return false
  if (!searchParams.has('group_order_id')) return false
  const orderId: string = searchParams.get('group_order_id')!
  if (orderId.length < 10) return false
  return orderId
}
