import toast from "react-hot-toast";
import Dropdown from "../components/user/Dropdown";
import { Button, Input, Checkbox, Card, Form, Switch, Radio } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  FlagOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { userPath } from "../routes/routeConfig";

const { Content, Footer, Sider } = Layout;

const Settings = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    toast.success("Values Received");
    console.log(values);
  };

  return (
    <div className="container mx-auto">
      <div className="fixed top-4 left-4 z-50">
        <Dropdown />
      </div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={64} theme="light">
          <Menu
            mode="vertical"
            defaultSelectedKeys={["settings"]}
            style={{ borderRight: 0 }}
            className="mt-16"
          >
            <Menu.Item
              key="home"
              onClick={() => navigate(userPath.home)}
              icon={<HomeOutlined />}
            />
            <Menu.Item
              key="profile"
              onClick={() => navigate(userPath.profile)}
              icon={<UserOutlined />}
            />
            <Menu.Item
              key="country"
              onClick={() => navigate(userPath.country)}
              icon={<FlagOutlined />}
            />
            <Menu.Item
              key="settings"
              onClick={() => navigate(userPath.settings)}
              icon={<SettingOutlined />}
            />
          </Menu>
        </Sider>
        <Layout>
          <Content className="mx-4 mt-4">
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item
                className="cursor-pointer"
                onClick={() => navigate(userPath.home)}
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item>Settings</Breadcrumb.Item>
            </Breadcrumb>
            <Card
              title={
                <h1 className="text-2xl font-semibold">Account Settings</h1>
              }
              className="w-full mx-auto md:px-5 pt-4"
            >
              <div className="flex items-center justify-center max-w-md">
                <Form
                  name="settings"
                  onFinish={onFinish}
                  initialValues={{
                    name: "demo",
                    email: "demo@example.com",
                    emailNotifications: true,
                    darkMode: false,
                    language: "english",
                    twoFactorAuth: false,
                    newsletter: true,
                  }}
                >
                  <label className="text-md font-medium">Name</label>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Your Full Name" />
                  </Form.Item>
                  <label className="text-md font-medium">Email</label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email address!",
                      },
                      { type: "email", message: "Invalid email format" },
                    ]}
                  >
                    <Input
                      size="large"
                      type="email"
                      placeholder="Your Email Address"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Receive Email Notifications"
                    name="emailNotifications"
                    valuePropName="checked"
                  >
                    <Switch className="bg-gray-200" />
                  </Form.Item>
                  <Form.Item
                    label="Enable Dark Mode"
                    name="darkMode"
                    valuePropName="checked"
                  >
                    <Switch className="bg-gray-200" />
                  </Form.Item>
                  <Form.Item label="Preferred Language" name="language">
                    <Radio.Group>
                      <Radio value="english">English</Radio>
                      <Radio value="spanish">Spanish</Radio>
                      <Radio value="french">French</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label="Enable Two-Factor Authentication"
                    name="twoFactorAuth"
                    valuePropName="checked"
                  >
                    <Switch className="bg-gray-200" />
                  </Form.Item>
                  <Form.Item
                    label="Subscribe to Newsletter"
                    name="newsletter"
                    valuePropName="checked"
                  >
                    <Checkbox>Subscribe</Checkbox>
                  </Form.Item>
                  <div className="flex justify-center">
                    <Form.Item>
                      <Button
                        size="large"
                        className="bg-blue-500 hover:bg-blue-700 w-60 text-white"
                        htmlType="submit"
                      >
                        Save Changes
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </Card>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            GeoPulse ©{new Date().getFullYear()} Created by Afsal
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Settings;
