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
  console.log(order)
  current!.getOpenerEventChannel().on('order', (res: OrderData) => { setOrder(res) })

  const handleNavigate = ()=>{
    console.log('navigate')
    navigateToMiniProgram({
      appId: PDD_APPID,
      path: getPddMiniProgramURL(order?.groupOrderId||'')
    })
  }
  return (
    <div className={styles.container}>
      <Card order={order!} />
      <div className={styles.info}>
        <div className={styles.text}>拼团到期时间：{new Date(order?.expireTime || '').toLocaleString('zh-cn', { hour12: false })}</div>
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
        <div className={styles.button} onClick={handleNavigate} > <img className={styles.img} src={pddLogo} /> 前往拼多多</div>
        <div className={styles.button} onClick={() => setClipboardData({ data: `${PDD_URL}${order?.groupOrderId}` })}>
          <img className={styles.img} src={copySvg} alt="" />
          复制拼团链接</div>
      </div>
    </div>

  )
}

export default OrderDetail