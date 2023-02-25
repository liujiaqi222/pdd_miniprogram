import { useState } from 'react'
import { GoSearch } from "react-icons/go";
import Taro from "@tarojs/taro";
import { View, Text, Input, Button } from '@tarojs/components'
import styles from './index.module.scss'



console.log(styles)
function Index() {
  const [listType, setListType] = useState<'newGroup' | 'shortOne'>('newGroup')
  return (
    <View className={styles.container}>
      <View className={styles['list-type']}>
        <View className={listType === 'newGroup' ? `${styles.active} ${styles.list}` : styles.list} onClick={() => setListType('newGroup')}>最新拼单</View>
        <View className={listType === 'shortOne' ? `${styles.active} ${styles.list}` : styles.list} onClick={() => setListType('shortOne')}>只差一人</View>
      </View>
      <View className={styles['search-container']}>
        <View className={styles['input-container']}>
          <GoSearch style={{ position: 'absolute', top: '0.4rem', left: '0.15rem', color: '#555' }} />
          <Input placeholder='请输入关键字' className={styles.input} />
        </View>
        <View className={styles.btn} >搜索</View>
      </View>
    </View>
  )
}

export default Index
