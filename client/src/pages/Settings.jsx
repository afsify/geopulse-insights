import toast from "react-hot-toast";
import Dropdown from "../components/user/Dropdown";
import { Button, Input, Checkbox, Card, Form, Switch, Radio } from "antd";

const Settings = () => {
  const onFinish = (values) => {
    toast.success("Values Received");
    console.log(values);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="fixed top-4 left-4 z-50">
        <Dropdown />
      </div>
      <Card title="Account Settings" className="max-w-md mx-auto mt-20">
        <Form
          name="settings"
          onFinish={onFinish}
          initialValues={{
            name: "demo",
            email: "demo@null.com",
            emailNotifications: true,
            darkMode: false,
            language: "english",
            twoFactorAuth: false,
            newsletter: true,
          }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Your Full Name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please input your email address!" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input type="email" placeholder="Your Email Address" />
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
          <Form.Item>
            <Button
              size="large"
              className="bg-blue-500 hover:bg-blue-700 text-white"
              htmlType="submit"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
