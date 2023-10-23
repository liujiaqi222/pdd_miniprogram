import { useRedirectToAutoNewGroup } from "../../../hooks/redirect";

const AutoNewGroup = () => {
  const { handleNavigateToOpenNewGroup } = useRedirectToAutoNewGroup();
  return (
    <div
      className="text-center text-orange font-bold border rounded-lg border-orange py-1"
      onClick={handleNavigateToOpenNewGroup}
    >
      点我开新团 自动发布
    </div>
  );
};

export default AutoNewGroup;
