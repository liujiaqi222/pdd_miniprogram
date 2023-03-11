import https from 'https';
import fs from 'fs/promises'
import http from 'http'
import type { ReverseResult, PddData } from '../types/index.js'


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


const PDD_URL = 'https://mobile.yangkeduo.com/pincard_ask.html?__rp_name=brand_amazing_price_group&_pdd_tc=ffffff&_pdd_sbs=1&group_order_id='
export const getOrderData = async (orderId: string) => {
  const url = (process.env.PDD_URL || PDD_URL) + orderId
  const response = await fetch(url, {
    headers: {
      "accept-encoding": "gzip, deflate, br",
      cookie:
        process.env.COOKIE!,
    },
  });
  const data = await response.text()
  const matchedResult = data.match((/(?<=window.rawData=).+(?=;<\/script>)/))

  if (!matchedResult || !matchedResult[0].length) return false
  const pddData: PddData = JSON.parse(matchedResult[0])
  fs.writeFile('test.html', matchedResult)

  console.log(pddData.store.goodsInfo)
  return pddData.store

};

