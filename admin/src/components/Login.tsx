import { Button,  Form, Input } from "antd";

type Props = {
  onLogin: (name: string, password: string) => void;
};
type FieldType = {
  name: string;
  password: string;
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export const Login = ({ onLogin }: Props) => {
  const [form] = Form.useForm<FieldType>();
  const onFinish = ({ name, password }: FieldType) => {
    onLogin(name, password);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 400 }}
        initialValues={{ remember: true }}
      >
        <Form.Item<FieldType>
          label="用户名"
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" >
            登录
          </Button>
          <Button htmlType="button" onClick={onReset} className="ml-2">
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
