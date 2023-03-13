import { useState } from 'react'
import { getCurrentPages, setClipboardData, navigateToMiniProgram } from '@tarojs/taro'
import { type OrderData } from "../../api";
import { PDD_URL, PDD_APPID, getPddMiniProgramURL } from '../../consts';
import styles from './index.module.scss'
import Card from '../index/components/Card'
import pddLogo from '../../assets/pdd-logo.svg'
import copySvg from '../../assets/copy.svg'

const OrderDetail = () => {
  const [order, setOrder] = useState<OrderData | null>(null)
  const current = getCurrentPages().at(-1)
  current!.getOpenerEventChannel().on('order', (res: OrderData) => { setOrder(res) })

  const handleNavigate = () => {
    navigateToMiniProgram({
      appId: PDD_APPID,
      path: getPddMiniProgramURL(order!.groupOrderId),
      envVersion: 'release'
    })
  }


  return (
    <div className={styles.container}>
      <Card order={order!} />
      <div className={styles.info}>
        <div className={styles.text}>拼团到期时间：{formatDate(new Date(order?.expireTime || ''))}</div>
        <div className={styles.text}>目前还差：{order?.groupRemainCount} 人</div>
        {
          order?.groupUserList.length && (
            <div className={styles.userList}>
              <div className={styles.text}>当前拼团用户：</div>
              {order.groupUserList.map(user => <img key={user.avatar} src={user.avatar} className={styles.avatar} />)}
            </div>)
        }
      </div>
      <div className={styles.operationContainer}>
        <div className={styles.button} onClick={handleNavigate} style={{ backgroundColor:'#f40006'}} > <img className={styles.img} src={pddLogo} /> 前往拼多多</div>
        <div className={styles.button} onClick={() => setClipboardData({ data: `${PDD_URL}${order?.groupOrderId}` })}>
          <img className={styles.img} src={copySvg} alt="" />
          复制拼团链接</div>
      </div>
    </div>

  )
}

// 小程序不支持toLocaleString
// 转换日期为 年/月/日 时:分:秒
function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

export default OrderDetail