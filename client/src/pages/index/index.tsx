import { useState } from "react";
import {
  switchTab,
  usePullDownRefresh,
  useShareAppMessage,
} from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import SearchInput from "../../components/SearchInput";
import CardList from "./components/CardList";
import createSvg from "../../assets/create.svg";
import styles from "./index.module.scss";

function Index() {
  const [listType, setListType] = useState<"newGroup" | "shortOne">("newGroup");
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchKey, setSearchKey] = useState("");

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
      <View className={styles["util-container"]}>
        <SearchInput
          onClear={() => setSearchKey("")}
          onSearch={(data) => setSearchKey(data)}
        />

        <View
          className={styles["create-btn"]}
          onClick={() => switchTab({ url: "/pages/create/index" })}
        >
          <Image
            src={createSvg}
            style={{ width: "2rem", height: "2rem", display: "block" }}
          ></Image>
        </View>
      </View>
      <View className={styles["list-type"]}>
        <Text
          className={
            listType === "newGroup"
              ? `${styles.active} ${styles.list}`
              : styles.list
          }
          onClick={() => setListType("newGroup")}
        >
          最新
        </Text>
        <Text
          className={
            listType === "shortOne"
              ? `${styles.active} ${styles.list}`
              : styles.list
          }
          onClick={() => setListType("shortOne")}
        >
          只差一人
        </Text>
      </View>
      <CardList searchKey={searchKey} listType={listType} key={refreshKey} />
    </View>
  );
}

export default Index;
