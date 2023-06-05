import loadingSvg from "../assets/loading.svg";

const Loading = () => {
  return (
    <div className="pb-4 flex items-center justify-center gap-2 text-white">
      <img src={loadingSvg} alt="" className="w-6 h-6 rotate-animation" />
      <span className="text-sm">拼命加载中...</span>
    </div>
  );
};

export default Loading;
