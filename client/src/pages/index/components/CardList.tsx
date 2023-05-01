import { useEffect, useState } from "react";
import { getSystemInfoSync, showLoading, hideLoading, stopPullDownRefresh, navigateTo } from "@tarojs/taro";
import { ScrollView, type BaseEventOrig, type ScrollViewProps } from '@tarojs/components'
import { useOrderSearch } from "../hooks/useOrderSearch";
import Card from './Card'
import { type OrderParams,OrderData } from "../../../api/types";
import styles from './styles.module.scss'

const phoneInfo = getSystemInfoSync()
const remWidth = phoneInfo.windowWidth / 20

// 这里用scroll实现无限加载，微信小程序不支持ObserverIntersection
// 每个盒子的高度是6rem小程序：1rem = 屏幕的宽度除以20
const CardList = ({ searchKey, listType }: Required<OrderParams>) => {
  const [pageNumber, setPageNumber] = useState(0);
  const { orders, loading, hasMore } = useOrderSearch(searchKey, listType, pageNumber)
  if (loading) {
    showLoading({ title: '加载中' })
  } else {
    hideLoading()
    stopPullDownRefresh()
  }
  useEffect(() => {
    setPageNumber(0)
  }, [searchKey,listType])

  function handleScroll(e: BaseEventOrig<ScrollViewProps.onScrollDetail>) {
    if (loading || !hasMore) return
    // list高度为100vh-5rem，所以滚动到底部时，scrollTop + (100vh-5rem) = scrollHeight - 6rem(一个card的高度)
    if (e.detail.scrollTop + (phoneInfo.windowHeight - 5 * remWidth) >= e.detail.scrollHeight - 6 * remWidth) {
      setPageNumber(pageNumber + 1)
    }
  }
  const handleClick = (order: OrderData) => {
    navigateTo({
      url: '/pages/index/detail/index',
      success: (res) => {
        res.eventChannel.emit('order', order)
      }
    })
  }
  return (
    <ScrollView scrollY enableFlex scrollWithAnimation className={styles.list} onScroll={(e) => handleScroll(e)}>
      {orders.map((order) => <Card order={order} key={order.groupOrderId} onClick={() => handleClick(order)} />)}
      <div className={styles.tipText}>无更多拼单信息</div>

    </ScrollView>
  )
}

export default CardList
