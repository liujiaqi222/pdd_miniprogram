import {
  scanCode,
  showToast,
  showLoading,
  hideLoading,
  useShareAppMessage,
  switchTab,
} from "@tarojs/taro";
import { BaseEventOrig, Input, InputProps } from "@tarojs/components";
import { useState, useContext } from "react";
import { useRefreshStore } from "../../store/";
import TipModal from "./components/TipModal";
import { createNewGroup } from "../../api";
import { OpenIdContext } from "../../context";
import styles from "./index.module.scss";
import warningSvg from "../../assets/warning.svg";
import postSvg from "../../assets/post.svg";
import questionSvg from "../../assets/question.svg";

export default function User() {
  const [url, setUrl] = useState("");
  const openId = useContext(OpenIdContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [marketPrice, setMarketPrice] = useState<string>();
  const [alertText, setAlertText] = useState<string>();
  const setRefresh = useRefreshStore((state) => state.setRefresh);
  useShareAppMessage(() => {
    return {
      title: "百亿活动报名 | 发布拼团",
    };
  });
  const handleUpload = () => {
    showLoading();
    scanCode({
      success(res) {
        const { result, scanType } = res;
        hideLoading();
        if (scanType !== "QR_CODE") {
          return showToast({
            title: "未发现二维码",
            icon: "error",
          });
        }
        if (!result) return showToast({ title: "未发现链接", icon: "error" });
        setUrl(result);
      },
      fail() {
        hideLoading();
        return showToast({
          title: "取消上传",
          icon: "error",
        });
      },
    });
  };
  const handlePost = async () => {
    if (!url) return showToast({ title: "请先上传拼团", icon: "error" });
    if (!marketPrice) {
      setAlertText("请输入行情价！");
      return showToast({ title: "请输入行情价", icon: "error" });
    }
    if (alertText) return showToast({ title: "行情价不合法", icon: "error" });
    if (isLoading) return showToast({ title: "正在发布", icon: "error" });
    setIsLoading(true);
    showLoading();
    const res = await createNewGroup(url, openId, Number(marketPrice)).catch(
      () => {
        setIsLoading(false);
        hideLoading();
      }
    );
    hideLoading();
    setIsLoading(false);
    if (!res || !res.data) {
      console.log(res);
      return showToast({ title: "发布失败", icon: "error" });
    }
    setUrl("");
    showToast({
      title: res.data.message,
      icon: res.data.success ? "success" : "error",
    });
    if (res.data.success) {
      switchTab({
        url: "/pages/index/index",
      });
      setRefresh(true);
    }
  };

  const handleValidateMarketPrice = (
    e: BaseEventOrig<InputProps.inputEventDetail>
  ) => {
    setAlertText("");
    const value = e.detail.value;
    setMarketPrice(value);
    if (Number.isNaN(Number(value))) {
      setAlertText("行情价必须是数字");
      return;
    }
    // 判断是否大于0
    if (Number(value) <= 0) {
      setAlertText("行情价必填且必须大于0");
      return;
    }
    // 判断是否大于10万
    if (Number(value) > 100000) {
      setAlertText("行情价必须小于10万");
      return;
    }
  };
  return (
    <div className={styles.container} onClick={() => setShowModal(false)}>
      <div>
        <div className={styles.tips}>
          <header className={styles.header}>
            <img src={warningSvg} className={styles.svg} alt="" />
            <span className={styles.text}>温馨提示:</span>
          </header>
          <p className={styles.text}>
            请先搜索已经开团的商品，如果有您想要的商品，直接参与拼团，不必发布新的拼团！
          </p>
        </div>
        <div className={styles.upload}>
          <div className={styles.uploadTip}>
            <span className="flex">
              <span className="font-bold">第一步：</span> 上传拼团分享图片
            </span>
            <img
              src={questionSvg}
              alt=""
              className={styles.svg}
              onClick={(e) => {
                e.stopPropagation();
                setShowModal((pre) => !pre);
              }}
            />
          </div>
          <div></div>
          <div className={styles.uploadBtn} onClick={handleUpload}>
            点击上传
          </div>
          <div className="h-16">
            {url && <span className={styles.text}>拼团连接：{url}</span>}
          </div>
          <div>
            <div className="flex mt-6">
              <span className="font-bold">第二步：</span>
              <span>请输入行情价</span>
              <span className="text-red">(乱写将被封号)</span>
            </div>

            <Input
              type="number"
              value={marketPrice}
              onInput={handleValidateMarketPrice}
              className="border px-2 py-1 outline rounded outline-none mx-3 my-2"
            />
            {alertText && <div className="ml-2 text-red">{alertText}</div>}
          </div>
        </div>
      </div>
      <div>
        <div
          className={`${styles.uploadBtn} ${styles.postBtn}`}
          onClick={handlePost}
        >
          <img src={postSvg} alt="发布拼团" className={styles.svg} />
          发布拼团
        </div>
      </div>
      {showModal && <div className={styles.mask}></div>}
      <TipModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
