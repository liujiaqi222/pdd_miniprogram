import { useEffect, useState } from "react";
import Card from './Card'
import { getOrders, type OrderData } from "../../api";
import styles from './styles.module.scss'


const CardList = () => {
  const [list, setList] = useState<OrderData[]>([])
  useEffect(() => {
    getOrders().then((res) => {
      setList(res.data);
    })
  }, [])
  console.log(list)
  return (
    <div  className={styles.list}>
      {list.map((order) => <Card order={order} key={order.groupOrderId} />)}
    </div>
  )
}

export default CardList
