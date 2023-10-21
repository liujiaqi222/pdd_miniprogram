import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { changeGroupUrl, getGroupUrl } from "@/api";
import { useToast } from "@/components/ui/use-toast";

const AdminConfig = () => {
  const [groupUrl, setGroupUrl] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    getGroupUrl().then((res) => {
      if (res?.data?.success) {
        setGroupUrl(res.data.groupUrl);
      }
    });
  }, []);
  const handleChangeUrl = async () => {
    const result = await changeGroupUrl(groupUrl);
    if (result?.data?.success) {
      toast({
        description: "更新成功",
      });
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          className="w-80"
          placeholder="群链接"
          value={groupUrl}
          onChange={(e) => setGroupUrl(e.target.value)}
        />
        <Button type="submit" className="w-20" onClick={handleChangeUrl}>
          更新
        </Button>
      </div>
    </div>
  );
};

export default AdminConfig;
