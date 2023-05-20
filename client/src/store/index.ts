import { create } from "zustand";
import { OrderData } from "./../api/types.d";

type OrderDataStoreState = {
  orderData: OrderData;
  setOrderData: (orderData: OrderData) => void;
};

export const useOrderDataStore = create<OrderDataStoreState>((set) => {
  return {
    orderData: {} as OrderData,
    setOrderData: (orderData: OrderData) =>
      set(() => ({ orderData: orderData })),
  };
});

type RefreshStoreState = {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
};
// 如果用户上传了新的拼单，则返回首页的时候需要刷新首页
export const useRefreshStore = create<RefreshStoreState>((set) => {
  return {
    refresh: false,
    setRefresh: (refresh: boolean) => set(() => ({ refresh: refresh })),
  };
});
