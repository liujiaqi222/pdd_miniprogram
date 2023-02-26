import { useState } from 'react'
import Taro from "@tarojs/taro";
import { View, Text, Input, Button, Image } from '@tarojs/components'
import CardList from '../components/CardList';
import createSvg from '../../assets/create.svg'
import styles from './index.module.scss'



console.log(styles)
function Index() {
  const [listType, setListType] = useState<'newGroup' | 'shortOne'>('newGroup')
  return (
    <View className={styles.container}>
      <View className={styles['util-container']}>
        <View className={styles['input-container']}>
          <Input placeholder='请输入关键字' className={styles.input} />
          <View className={styles.btn} >搜索</View>
        </View>
        <View className={styles['create-btn']}>
          <Image src={createSvg} style={{ width: '2rem', height: '2rem', display: 'block' }}></Image>
        </View>
      </View>
      <View className={styles['list-type']}>
        <Text className={listType === 'newGroup' ? `${styles.active} ${styles.list}` : styles.list} onClick={() => setListType('newGroup')}>最新</Text>
        <Text className={listType === 'shortOne' ? `${styles.active} ${styles.list}` : styles.list} onClick={() => setListType('shortOne')}>只差一人</Text>
      </View>
      <CardList />
    </View>
  )
}

export default Index
