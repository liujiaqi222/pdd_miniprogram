import AutoNewGroup from "./AutoNewGroup";

const data = [
  { name: "百亿补贴" },
  { name: "今日爆款" },
  { name: "内购清单" },
  { name: "品牌清仓" },
  { name: "限时秒杀" },
];



const Promotion = () => {
  return (
    <div className="flex flex-col gap-2 px-4 mb-4">
      <AutoNewGroup />
      <div className="flex justify-center gap-2">
        {data.map((item) => {
          return (
            <div className="" key={item.name}>
              <div>{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Promotion;
