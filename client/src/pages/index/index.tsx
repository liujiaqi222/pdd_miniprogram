import { useState } from "react";
import {
  usePullDownRefresh,
  useShareAppMessage,
} from "@tarojs/taro";
import { View, Text,  } from "@tarojs/components";
import { useRefreshStore } from "../../store";
import SearchInput from "../../components/SearchInput";
import CardList from "./components/CardList";
import styles from "./index.module.scss";

function Index() {
  const [listType, setListType] = useState<"newGroup" | "shortOne">("newGroup");
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const refreshStore = useRefreshStore();

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
  return (
    <View className={styles.container}>
      <View className="fixed top-0 z-[999] bg-primary">
        <View className={styles["util-container"]}>
          <SearchInput
            onClear={() => setSearchKey("")}
            onSearch={(data) => setSearchKey(data)}
          />

        </View>
        <View className={styles["list-type"]}>
          <Text
            className={
              listType === "newGroup"
                ? `${styles.active} ${styles.list}`
                : styles.list
            }
            onClick={() => {
              setListType("newGroup");
              setRefreshKey((prev) => prev + 1);
            }}
          >
            最新
          </Text>
          <Text
            className={
              listType === "shortOne"
                ? `${styles.active} ${styles.list}`
                : styles.list
            }
            onClick={() => {
              setListType("shortOne");
              setRefreshKey((prev) => prev + 1);
            }}
          >
            只差一人
          </Text>
        </View>
      </View>
        <CardList searchKey={searchKey} listType={listType} key={refreshKey} />
    </View>
  );
}

export default Index;
