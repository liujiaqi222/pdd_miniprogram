import { useEffect, useState } from "react";
import { Button, Flex, Form, Spin, Switch } from "antd";

import { type Config, changeConfig, getConfig } from "@/api";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

const AdminConfig = () => {
  const [config, setConfigUrl] = useState<Config>({
    groupUrl: "",
    officialQrCodeURL: "",
    autoNewGroupURL: "",
    isOnReview: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm<Config>();

  useEffect(() => {
    getConfig().then(({ success, data }) => {
      setIsLoading(false);
      if (success) {
        console.log(data);
        setConfigUrl(data);
        form.resetFields();
      }
    });
  }, [form]);
  const handleChange = async (type: keyof Config) => {
    await form.validateFields([type]);
    const res = await changeConfig(type, form.getFieldValue(type)).catch(() => {
      message.error("更新失败");
    });
    if (res && res.success) {
      message.success("更新成功");
    }
  };
  return (
    <div className="flex justify-center  pt-8">
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
          <Form.Item label="群链接">
            <Flex gap="small">
              <Form.Item
                name="groupUrl"
                noStyle
                rules={[{ required: true, message: "群链接不能为空" }]}
              >
                <TextArea />
              </Form.Item>
              <Button type="primary" onClick={() => handleChange("groupUrl")}>
                更新
              </Button>
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
              <Button
                type="primary"
                onClick={() => handleChange("officialQrCodeURL")}
              >
                更新
              </Button>
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
              <Button
                type="primary"
                onClick={() => handleChange("autoNewGroupURL")}
              >
                更新
              </Button>
            </Flex>
          </Form.Item>
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

export default AdminConfig;
