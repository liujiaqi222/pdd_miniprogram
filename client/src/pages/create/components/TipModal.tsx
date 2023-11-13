import { Image } from "@tarojs/components"
import styles from '../index.module.scss'
import pddImg from '../../../assets/pdd.jpg'
import closeSvg from '../../../assets/close.svg'


type TipModalProps = {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

const TipModal = ({ showModal, setShowModal }: TipModalProps) => {
  const modalStyles = showModal ? `${styles.modal}` : `${styles.modal} ${styles.close}`
  return (
    <div className={modalStyles} onClick={e=>e.stopPropagation()}>
      <div className={styles.modalContent}>
        <div className={styles.title}>
          <span>如何发布拼团?</span>
          <img src={closeSvg} alt="" className='w-4 h-4' onClick={() => setShowModal(false)} />
        </div>
        <div className={styles.text}>1. 在拼多多上购买某个需要多人拼团的百亿补贴的商品。</div>
        <div className={styles.text}>2. 购买后，会弹出如下弹窗，点击分享图片，即可保存图片到本地。</div>
        <Image src={pddImg} style={styles.img} mode='aspectFit' />
        <div className={styles.text}>3. 在本小程序里上传拼团图片，最后点击发布即可。</div>
      </div>
    </div>
  )
}
export default TipModal
