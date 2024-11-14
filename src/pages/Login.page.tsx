import { Button, Flex, Form, Input } from "antd";
import Cookies from "js-cookie";
import { Bounce, toast } from "react-toastify";
import { apiService } from "../services/apiService.ts";


type FieldType = {
  email?: string;
  password?: string;
};
export const Login = () => {


  const onFinish = (values: FieldType) => {
    apiService
      .post("login/", {
        ...values,
      })
      .then((res) => res.data)
      .then((data: User) => {
        if (data.token) {
          Cookies.set("access_token", data.token);

          window.location.href = "/rork-books/";
        }
      })
      .catch(() => {
        toast.error("Login Error ⚠️", {
          position: "top-right",
          autoClose: 5001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh"}} vertical={true}>
		<div style={{ fontSize: "50px", fontWeight: "bold", marginBottom: "20px" }}>
	  WELCOME TO RORK
	  </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        style={{ maxWidth: 600, backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "30px", borderRadius: "20px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
