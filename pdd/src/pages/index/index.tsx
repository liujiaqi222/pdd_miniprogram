import { useState, useRef } from 'react'
import { switchTab } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import CardList from './components/CardList';
import createSvg from '../../assets/create.svg'
import styles from './index.module.scss'



function Index() {
  const [listType, setListType] = useState<'newGroup' | 'shortOne'>('newGroup')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [searchKey, setSearchKey] = useState('')
  function handleSearch() {
    setSearchKey(inputRef.current?.value || '')
  }
  return (
    <View className={styles.container} >
      <View className={styles['util-container']}>
        <View className={styles['input-container']}>
          <Input placeholder='请输入关键字' className={styles.input} ref={inputRef} />
          <View className={styles.btn} onClick={handleSearch}>搜索</View>
        </View>
        <View className={styles['create-btn']} onClick={() => switchTab({ url: '/pages/create/index' })}>
          <Image src={createSvg} style={{ width: '2rem', height: '2rem', display: 'block' }}></Image>
        </View>
      </View>
      <View className={styles['list-type']}>
        <Text className={listType === 'newGroup' ? `${styles.active} ${styles.list}` : styles.list} onClick={() => setListType('newGroup')}>最新</Text>
        <Text className={listType === 'shortOne' ? `${styles.active} ${styles.list}` : styles.list} onClick={() => setListType('shortOne')}>只差一人</Text>
      </View>
      <CardList searchKey={searchKey} listType={listType} />
    </View>
  )
}

export default Index
