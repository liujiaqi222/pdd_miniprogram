import { useState } from "react";
import { Image } from "@tarojs/components";
import officialAccountSvg from "../assets/official-account.svg";
import weChat from "../assets/weChat.svg";
import arrow from "../assets/arrow.svg";
import SlideModal from "./SlideModal";
import { useConfigStore } from "../store";

const Follow = ({ bgWhite = false }) => {
  const containerClassNames = `flex-1 flex flex-col justify-center gap-1 rounded-xl py-4 px-4 ${
    bgWhite ? "bg-white shadow-lg" : "bg-gray-light"
  }`;
  return (
    <div className="flex gap-4">
      <FollowOfficialAccount containerClassNames={containerClassNames} />
      <JoinWeChatGroup containerClassNames={containerClassNames} />
    </div>
  );
};

export default Follow;

// 公众号
const FollowOfficialAccount = ({
  containerClassNames,
}: {
  containerClassNames: string;
}) => {
  const officialQrCodeURL = useConfigStore(
    (state) => state.config?.officialQrCodeURL
  );
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={containerClassNames} onClick={() => setIsOpen(true)}>
        <div>
          <img
            className="w-5 h-5"
            src={officialAccountSvg}
            alt="weChat-official-account"
          />
        </div>
        <div className="flex items-center gap-1 font-bold text-sm">
          关注公众号
          <img src={arrow} alt="arrow" className="w-4 h-4" />
        </div>
      </div>
      <SlideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-2 items-center pt-2 pb-4">
          <div className="font-bold text-gray-800">关注【百亿拼Go】公众号</div>
          <div className="text-gray-600">关注公众号，获取最新拼团信息</div>
          <img
            src={officialQrCodeURL}
            alt="公众号二维码"
            className="w-48 h-48"
          />
          <div className="text-gray-600">长按二维码关注</div>
        </div>
      </SlideModal>
    </>
  );
};

// 加群
const JoinWeChatGroup = ({
  containerClassNames,
}: {
  containerClassNames: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const groupUrl = useConfigStore((state) => state?.config?.groupUrl);

  return (
    <>
      <div className={containerClassNames} onClick={() => setIsOpen(true)}>
        <div>
          <img className="w-5 h-5" src={weChat} alt="wechat" />
        </div>
        <div className="flex items-center gap-1 font-bold text-sm">
          加微信群 <img src={arrow} alt="arrow" className="w-4 h-4" />
        </div>
      </div>
      <SlideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-2 items-center pt-2 pb-4 ">
          <div className="font-bold text-gray-800 text-xl">
            加入微信群，拼团更快
          </div>
          <Image src={groupUrl} mode="widthFix" style="width:280px" />
          <div className="text-gray-600">长按二维码加群</div>
        </div>
      </SlideModal>
    </>
  );
};
