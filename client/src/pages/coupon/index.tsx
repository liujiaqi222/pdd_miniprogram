import { useEffect, useState } from "react";
import { ScrollView } from "@tarojs/components";
import SearchInput from "../../components/SearchInput";
import { getCouponGoods } from "../../api/index";

const Coupon = () => {
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    getCouponGoods().then((res) => {
      console.log(res);
    });
  });
  return (
    <div className="bg-[#ff1a1a] px-2 h-screen flex flex-col gap-2">
      <SearchInput
        onClear={() => setSearchKey("")}
        onSearch={(data) => setSearchKey(data)}
      />
      <ScrollView
        scrollY
        enableFlex
        scrollWithAnimation
        className="bg-[blue] h-[calc(100vh_-_3rem)]"
      ></ScrollView>
    </div>
  );
};

export default Coupon;
