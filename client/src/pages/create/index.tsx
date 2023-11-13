import {
  scanCode,
  showToast,
  showLoading,
  hideLoading,
  useShareAppMessage,
  switchTab,
} from "@tarojs/taro";
import { useState, useContext } from "react";
import { useRefreshStore, useConfigStore } from "../../store/";
import { useRedirectToAutoNewGroup } from "../../hooks/redirect";
import TipModal from "./components/TipModal";
import { createNewGroup } from "../../api";
import { OpenIdContext } from "../../context";
import styles from "./index.module.scss";
import questionSvg from "../../assets/question.svg";
import AutoNewGroup from "../../components/AutoNewGroup";

export default function User() {
  const [url, setUrl] = useState("");
  const openId = useContext(OpenIdContext);
  const { handleNavigateToOpenNewGroup } = useRedirectToAutoNewGroup();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const setRefresh = useRefreshStore((state) => state.setRefresh);
  const isOnReview = useConfigStore((state) => state.config.isOnReview);

  useShareAppMessage(() => {
    return {
      title: "百亿拼团GO | 发布拼团",
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
    if (isLoading) return showToast({ title: "正在发布", icon: "error" });
    setIsLoading(true);
    showLoading();
    const res = await createNewGroup(url, openId).catch(() => {
      setIsLoading(false);
      hideLoading();
    });
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
  return (
    <div
      className="px-3 relative h-screen overflow-hidden"
      onClick={() => setShowModal(false)}
    >
      {!isOnReview && <AutoNewGroup />}
      <div className="flex gap-1 items-center mt-6 mb-2">
        <span className="text-sm font-bold text-[#555]">
          上传多多拼团分享图片
        </span>
        <img
          src={questionSvg}
          alt="拼团教程"
          className="w-3 h-3"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal((pre) => !pre);
          }}
        />
      </div>
      {/* 上传 */}
      <div
        onClick={handleUpload}
        className="border border-gray h-44 rounded flex flex-col items-center justify-center relative px-4"
      >
        <div className="relative">
          <div className="w-8 h-[2px] bg-gray-200"></div>
          <div className="absolute l-1/2 -top-4 h-8 w-[2px] bg-gray-200 translate-x-8"></div>
        </div>
        <span className="text-xs text-gray-500 mt-6">选择拼团图片</span>
        {url && (
          <span className="text-xs text-gray-500 mt-1 ellipsis-line-3 break-all">
            上传链接：{url}
          </span>
        )}
      </div>
      <div className="flex gap-2 items-end mt-4">
        {!isOnReview && (
          <div
            className="flex-1 flex justify-center items-center h-10 bg-pink-light text-primary  font-bold rounded"
            onClick={handleNavigateToOpenNewGroup}
          >
            开新团自动发布
          </div>
        )}
        <div className="flex-1">
          <div className="flex justify-center items-center h-6 text-green-darker bg-green-light font-bold text-xs">
            发布前 请先搜索
          </div>
          <div
            onClick={handlePost}
            className="flex justify-center items-center h-10 mt-1 bg-green text-white font-bold  rounded"
          >
            发布
          </div>
        </div>
      </div>
      {isOnReview && (
        <div className="mt-2">
          注意：本小程序采用微信原生的二维码识别工具识别您上传的二维码，仅存储拼团组队的链接。
        </div>
      )}
      {showModal && <div className={styles.mask}></div>}
      <TipModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
