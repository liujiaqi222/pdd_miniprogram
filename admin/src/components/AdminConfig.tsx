import { useEffect, useState } from "react";
import { Button, Flex, Form, Select, Spin, Switch } from "antd";
import { changeConfig, getConfig, type Config } from "@/api";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

export const SetConfig = () => {
  const [appType, setAppType] = useState("default");
  const handleAppTypeChange = (value: string) => {
    setAppType(value);
  };
  return (
    <div className="flex justify-center flex-col items-center pt-2">
      <SelectApp onChange={handleAppTypeChange} defaultValue={appType} />
      <hr />
      <AdminConfig appType={appType} />
    </div>
  );
};

const appOptions = [
  {
    value: "default",
    label: "默认",
  },
  {
    value: "app1",
    label: "百亿拼团GO",
  },
  {
    value: "app2",
    label: "百亿拼团助手GO",
  },
  {
    value: "app3",
    label: "百亿补贴拼团助手",
  },
  {
    value: "app4",
    label: "拼团呀百亿拼团助手",
  },
];

const SelectApp = ({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue: string;
}) => {
  return (
    <div className="flex items-center">
      <span>选择小程序：</span>
      <Select
        style={{ width: 170 }}
        options={appOptions}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

const AdminConfig = ({ appType }: { appType: string }) => {
  const [config, setConfig] = useState<Config>({
    groupUrl: "",
    officialQrCodeURL: "",
    autoNewGroupURL: "",
    isOnReview: false,
    promotionBanner: {
      isShow: false,
      image: "",
      url: "",
    },
    cookie: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm<Config>();
  const isShowBanner = Form.useWatch(["promotionBanner", "isShow"], form);

  useEffect(() => {
    setIsLoading(true);
    getConfig(appType).then(({ data }) => {
      setConfig(data);
      setTimeout(() => {
        form.resetFields();
      });
      setIsLoading(false);
    });
  }, [form, appType]);
  const handleChange = async (type: keyof Config, path: string[][] = [],changeAll=false) => {
    await form.validateFields(path.length ? path : [type]);
    const value = !path.length
      ? form.getFieldValue(type)
      : path.reduce((acc: Record<string, any>, cur) => {
          acc[cur[1]] = form.getFieldValue(cur);
          return acc;
        }, {});
    const res = await changeConfig(type, value, changeAll?'all':appType).catch(() => {
      message.error("更新失败");
    });
    if (res && res.success) {
      message.success("更新成功");
    }
  };
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form
          form={form}
          name="basic"
          labelWrap
          layout="vertical"
          style={{ maxWidth: 600, minWidth: 320 }}
          autoComplete="off"
          initialValues={config}
        >
          <Form.Item label="拼多多Cookie">
            <Flex gap="small">
              <Form.Item
                name="cookie"
                noStyle
                rules={[{ required: true, message: "群链接不能为空" }]}
              >
                <TextArea />
              </Form.Item>
              <div className="flex flex-col w-24 gap-2">
                <button
                  onClick={() => handleChange("cookie")}
                  className="button"
                >
                  更新
                </button>
                <button
                  className="button"
                  onClick={() => handleChange("cookie",[],true)}
                >
                  更新全部
                </button>
              </div>
            </Flex>
          </Form.Item>
          <Form.Item label="群链接">
            <Flex gap="small">
              <Form.Item
                name="groupUrl"
                noStyle
                rules={[{ required: true, message: "群链接不能为空" }]}
              >
                <TextArea />
              </Form.Item>
              <div className="flex flex-col w-24 gap-2">
                <button
                  onClick={() => handleChange("groupUrl")}
                  className="button"
                >
                  更新
                </button>
                <button
                  className="button"
                  onClick={() => handleChange("groupUrl", [], true)}
                >
                  更新全部
                </button>
              </div>
            </Flex>
          </Form.Item>
          <Form.Item label="公众号二维码链接">
            <Flex gap="small">
              <Form.Item
                name="officialQrCodeURL"
                noStyle
                rules={[
                  { required: true, message: "公众号二维码链接不能为空" },
                ]}
              >
                <TextArea />
              </Form.Item>
              <div className="flex flex-col w-24 gap-2">
                <button
                  onClick={() => handleChange("officialQrCodeURL")}
                  className="button"
                >
                  更新
                </button>
                <button
                  className="button"
                  onClick={() => handleChange("officialQrCodeURL", [], true)}
                >
                  更新全部
                </button>
              </div>
            </Flex>
          </Form.Item>
          <Form.Item label="自动开团小程序跳转地址">
            <Flex gap="small">
              <Form.Item
                name="autoNewGroupURL"
                noStyle
                rules={[
                  { required: true, message: "自动开团小程序跳转地址不能为空" },
                ]}
              >
                <TextArea />
              </Form.Item>
              <div className="flex flex-col w-24 gap-2">
                <button
                  onClick={() => handleChange("autoNewGroupURL")}
                  className="button"
                >
                  更新
                </button>
                <button
                  className="button"
                  onClick={() => handleChange("autoNewGroupURL", [], true)}
                >
                  更新全部
                </button>
              </div>
            </Flex>
          </Form.Item>
          <div className="border border-gray-200 border-solid px-2 pt-2 rounded-lg mb-2">
            <Form.Item label="营销Banner">
              <div className="flex">
                <div className="flex-1">
                  <Form.Item
                    name={["promotionBanner", "isShow"]}
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                  {isShowBanner && (
                    <>
                      <Form.Item
                        name={["promotionBanner", "image"]}
                        label="图片链接"
                        rules={[
                          {
                            required: true,
                            message: "图片链接不能为空",
                          },
                        ]}
                      >
                        <TextArea />
                      </Form.Item>
                      <Form.Item
                        name={["promotionBanner", "url"]}
                        label="跳转链接"
                        rules={[
                          {
                            required: true,
                            message: "跳转链接不能为空",
                          },
                        ]}
                      >
                        <TextArea />
                      </Form.Item>
                    </>
                  )}
                </div>

                <div className="flex flex-col w-18 gap-2">
                  <button
                    onClick={() =>
                      handleChange("promotionBanner", [
                        ["promotionBanner", "isShow"],
                        ["promotionBanner", "image"],
                        ["promotionBanner", "url"],
                      ])
                    }
                    className="button"
                  >
                    更新
                  </button>
                  <button
                    className="button"
                    onClick={() =>
                      handleChange(
                        "promotionBanner",
                        [
                          ["promotionBanner", "isShow"],
                          ["promotionBanner", "image"],
                          ["promotionBanner", "url"],
                        ],
                        true
                      )
                    }
                  >
                    更新全部
                  </button>
                </div>
              </div>
            </Form.Item>
          </div>
          <Form.Item label="审核模式">
            <div className="flex">
              <Form.Item
                name="isOnReview"
                valuePropName="checked"
                className="flex-1"
              >
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
              <Button type="primary" onClick={() => handleChange("isOnReview")}>
                更新
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
