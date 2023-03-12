import { useState, useEffect } from "react";
import { getOrders, OrderData } from "../../../api";

type OrderSearchReturn = { orders: OrderData[], loading: boolean, hasMore: boolean, error: any }

export const useOrderSearch = (searchKey: string, listType: 'shortOne' | 'newGroup', pageNumber: number): OrderSearchReturn => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<OrderData[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getOrders({ searchKey, listType }, pageNumber).then(res => {
      const { data } = res
      setHasMore(data.length === 0 ? false : true)
      setOrders(pre => [...pre, ...data])
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      setError(err)
    })
  }, [listType, pageNumber, searchKey])
  // 如果searchKey发生了变化，清空数据
  useEffect(() => {
    setOrders([])
    console.log('changed, clear orders')
  }, [searchKey, listType])

  return { orders, loading, hasMore, error }
}
