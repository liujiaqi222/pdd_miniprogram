import { useState } from "react";
import { usePullDownRefresh, useShareAppMessage } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useRefreshStore, useConfigStore } from "../../store";
import SearchInput from "../../components/SearchInput";
import Promotion from "./components/Promotion";
import CardList from "./components/CardList";

function Index() {
  const [listType, setListType] = useState<"newGroup" | "shortOne">("newGroup");
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const refreshStore = useRefreshStore();
  const isOnReview = useConfigStore((state) => state.config.isOnReview);

  if (refreshStore.refresh) {
    refreshStore.setRefresh(false);
    if (listType === "shortOne") {
      setListType("newGroup");
    } else {
      setRefreshKey((prev) => prev + 1);
    }
  }
  usePullDownRefresh(() => {
    setSearchKey("");
    setRefreshKey((prev) => prev + 1); // 用于刷新组件
  });

  useShareAppMessage(() => {
    return {
      title: "百亿多人团 | 一键参团 快速成团",
    };
  });

  const categoryTextStyle = "font-bold text-primary-lighter underline";
  return (
    <View>
      {!isOnReview && (
        <>
          <Promotion />
          <View className="h-2 bg-gray-light w-full"></View>
        </>
      )}
      <View className="sticky top-0 z-[999] bg-white py-2">
        <View className="flex justify-between px-20 mb-3 underline-offset-4">
          <Text
            onClick={() => {
              setListType("newGroup");
              setRefreshKey((prev) => prev + 1);
            }}
            className={listType === "newGroup" ? categoryTextStyle : ""}
          >
            最新
          </Text>
          <Text
            onClick={() => {
              setListType("shortOne");
              setRefreshKey((prev) => prev + 1);
            }}
            className={listType === "shortOne" ? categoryTextStyle : ""}
          >
            差一人
          </Text>
        </View>
        <View className="px-2">
          <SearchInput
            onClear={() => setSearchKey("")}
            onSearch={(data) => setSearchKey(data)}
          />
        </View>
      </View>
      <CardList searchKey={searchKey} listType={listType} key={refreshKey} />
    </View>
  );
}

export default Index;
