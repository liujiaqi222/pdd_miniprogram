import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { changeGroupUrl, getConfig } from "@/api";
import { useToast } from "@/components/ui/use-toast";

type ConfigType = "groupUrl" | "officialQrCodeURL" | "autoNewGroupURL";
const AdminConfig = () => {
  const [config, setConfigUrl] = useState<Record<ConfigType, string>>({
    groupUrl: "",
    officialQrCodeURL: "",
    autoNewGroupURL: "",
  });
  const { toast } = useToast();
  useEffect(() => {
    getConfig().then((res) => {
      if (res?.data?.success) {
        setConfigUrl(res.data.data);
      }
    });
  }, []);
  const handleChange = async (type: ConfigType) => {
    const result = await changeGroupUrl(type, config[type]);
    if (result?.data?.success) {
      toast({
        description: "更新成功",
      });
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="w-44 text-sm  text-right">群二维码链接:</span>
          <Textarea
            className="w-96 text-sm"
            placeholder="群链接"
            value={config.groupUrl}
            onChange={(e) =>
              setConfigUrl((pre) => ({ ...pre, groupUrl: e.target.value }))
            }
          />
          <Button
            type="submit"
            className="w-20"
            onClick={() => handleChange("groupUrl")}
          >
            更新
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-44 text-sm  text-right">公众号二维码链接:</span>
          <Textarea
            className="w-96 text-sm"
            placeholder="公众号链接"
            value={config.officialQrCodeURL}
            onChange={(e) =>
              setConfigUrl((pre) => ({
                ...pre,
                officialQrCodeURL: e.target.value,
              }))
            }
          />
          <Button
            type="submit"
            className="w-20"
            onClick={() => handleChange("officialQrCodeURL")}
          >
            更新
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-44 text-sm  text-right">
            自动开团小程序跳转地址:
          </span>
          <Textarea
            className="w-96 text-sm"
            placeholder="群链接"
            value={config.autoNewGroupURL}
            onChange={(e) =>
              setConfigUrl((pre) => ({
                ...pre,
                autoNewGroupURL: e.target.value,
              }))
            }
          />
          <Button
            type="submit"
            className="w-20"
            onClick={() => handleChange("autoNewGroupURL")}
          >
            更新
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
