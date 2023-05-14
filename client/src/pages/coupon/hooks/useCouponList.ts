import { useState, useEffect } from "react";
import type { CouponData } from "../../../api/types";
import { getCouponGoods, searchCouponGoods } from "../../../api/index";

// 和userOrderSearch其实内容差不多，等待后续优化

export const useCouponFetch = (currentPage: number, searchKey: string) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<CouponData[]>([]);

  useEffect(() => {
    setLoading(true);
    const fn = searchKey ? searchCouponGoods : getCouponGoods;
    fn(currentPage, searchKey)
      .then((list: CouponData[]) => {
        setData((prev) => [...prev, ...list]);
        setLoading(false);
        setHasMore(list.length === 0 ? false : true);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [currentPage, searchKey]);

  useEffect(() => {
    setData([]);
  }, [searchKey]);

  return { data, loading, hasMore, error };
};
