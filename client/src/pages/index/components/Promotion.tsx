import { navigateToMiniProgram } from "@tarojs/taro";
import AutoNewGroup from "./AutoNewGroup";
import idCard from "../../../assets/home/idCard.svg";
import redEnvelope from "../../../assets/home/red-envelope.svg";
import coupon1 from "../../../assets/home/coupon1.svg";
import coupon2 from "../../../assets/home/coupon2.svg";
import coupon3 from "../../../assets/home/coupon3.svg";
import { PDD_COUPON_APPID } from "../../../consts";

const data = [
  {
    name: "百亿补贴",
    image: coupon2,
    url: "https://mobile.yangkeduo.com/duo_transfer_channel.html?resourceType=39996&pid=36921809_276355565&_pdd_fs=1&_pdd_tc=ffffff&_pdd_sbs=1&cpsSign=CE_231016_36921809_276355565_08b144039070bf61ae8c8a85964bef82&_x_ddjb_act=%7B%22st%22%3A%226%22%7D&duoduo_type=3",
  },
  {
    name: "员工内购",
    image: idCard,
    url: "https://mobile.yangkeduo.com/duo_collection.html?__page=djbis&pid=36921809_268032553&cpsSign=CIP_231016_36921809_268032553_8654f64c58fd8f9e1a2e919a38a75eff&_x_ddjb_act=%7B%22st%22%3A%2217%22%7D&duoduo_type=3",
  },
  {
    name: "刮红包",
    image: redEnvelope,
    url: "https://mobile.yangkeduo.com/duo_gold_center.html?__page=dlc&pid=36921809_276354910&cpsSign=CSC_231016_36921809_276354910_0157072884af0028e06511e1c0154178&_x_ddjb_act=%7B%22st%22%3A%2215%22%7D&duoduo_type=3",
  },
  {
    name: "大额券",
    image: coupon1,
    url: "https://mobile.yangkeduo.com/duo_transfer_channel.html?resourceType=40000&pid=36921809_268032554&cpsSign=CE_231016_36921809_268032554_bbced27a8d7a4780298a3566a4851a69&_x_ddjb_act=%7B%22st%22%3A%226%22%7D&duoduo_type=3",
  },
  {
    name: "抵扣券",
    image: coupon3,
    url: "https://mobile.yangkeduo.com/duo_collection.html?pid=36921809_268032866&dis_t=1&cpsSign=CR_231016_36921809_268032866_fb99d12a299d4443488dc677c568dae8&_x_ddjb_act=%7B%22st%22%3A%225%22%7D&duoduo_type=3",
  },
];

const Promotion = () => {
  const handleNavigate = (url: string) => {
    navigateToMiniProgram({
      appId: PDD_COUPON_APPID,
      path: `pages/share/index.html?specialUrl=1&src=${encodeURIComponent(url)}`,
    });
  };
  return (
    <div className="flex flex-col gap-2 px-4 mb-4">
      <AutoNewGroup />
      <div className="flex justify-center gap-5 mt-3">
        {data.map((item) => {
          return (
            <div
              className="flex flex-col gap-1 items-center"
              key={item.name}
              onClick={() => handleNavigate(item.url)}
            >
              <img src={item.image} alt="promotion" className="w-7 h-7" />
              <div className="text-[#555]">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Promotion;
