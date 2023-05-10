import { create } from "zustand";
import { OrderData } from "./../api/types.d";

type State = {
  orderData: OrderData;
};

type Actions = {
  setOrderData: (orderData: OrderData) => void;
};

export const useOrderDataStore = create<State & Actions>((set) => {
  return {
    orderData: {} as OrderData,
    setOrderData: (orderData: OrderData) =>
      set(() => ({ orderData: orderData })),
  };
});
