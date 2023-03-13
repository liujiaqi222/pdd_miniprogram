import { scanCode, showToast } from "@tarojs/taro"
import { useState } from 'react'
import styles from './index.module.scss'
import warningSvg from '../../assets/warning.svg'
import postSvg from '../../assets/post.svg'
import questionSvg from '../../assets/question.svg'
import { createNewGroup } from '../../api'
import TipModal from "./components/TipModal"


export default function User() {
  const [url, setUrl] = useState('')
  const [showModal, setShowModal] = useState(false)
  const handleUpload = () => {
    scanCode({
      success(res) {
        const { result, scanType } = res
        if (scanType !== 'QR_CODE') {
          return showToast({
            title: '未发现二维码',
            icon: 'error'
          })
        }
        if (!result) return showToast({ title: '未发现链接', icon: 'error' })
        setUrl(result)
      },
      fail() {
        return showToast({
          title: '上传失败',
          icon: 'error'
        })
      }
    })

  }
  const handlePost = async () => {
    if (!url) return showToast({ title: '请先上传拼团', icon: 'error' })
    const res = await createNewGroup(url)
    const { data } = res
    if (!data) {
      return showToast({ title: '发布失败', icon: 'success' })
    }
    setUrl('')
    showToast({ title: data.message, icon: data.success ? 'success' : 'error' })
  }
  return (
    <div className={styles.container} onClick={() => setShowModal(false)} >
      <div>
        <div className={styles.tips}>
          <header className={styles.header}>
            <img src={warningSvg} className={styles.svg} alt="" /><span className={styles.text}>温馨提示:</span>
          </header>
          <p className={styles.text}>请先搜索已经开团的商品，如果有您想要的商品，直接参与拼团，不必发布新的拼团！</p>
        </div>
        <div className={styles.upload}>
          <div className={styles.uploadTip}>
            <span className={styles.text}>上传拼团分享图片</span>
            <img src={questionSvg} alt="" className={styles.svg}
              onClick={(e) => { e.stopPropagation(); setShowModal(pre => !pre) }}
            />
          </div>
          <div className={styles.uploadBtn} onClick={handleUpload}>
            点击上传
          </div>
          <div>
            <span className={styles.text}>拼团连接：{url}</span>
          </div>

        </div>
      </div>
      <div className={`${styles.uploadBtn} ${styles.postBtn}`} onClick={handlePost} >
        <img src={postSvg} alt="" className={styles.svg} />
        发布拼团
      </div>
      {showModal && <div className={styles.mask}></div>}
      <TipModal showModal={showModal} setShowModal={setShowModal} />

    </div>
  )
}


