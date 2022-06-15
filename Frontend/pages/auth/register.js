import Head from "next/head";
import FormCard from "components/UI/FormCard";

import { Form, Input, Button, Spin } from "antd";
import Link from "next/link";
import { useAppDispatch } from "hooks/hook";
import { RegisterHandler } from "store/feature/auth/authSlice";
import { useState } from "react";
import useUIThemeSetter from "hooks/useUIThemeSetter";
import { wrapper } from "store/store";
import useReqSetToken from "hooks/useReqSetToken";
import { useRouter } from "next/router";

const register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const onFinish = async (value) => {
    setLoading(true);
    let res = await dispatch(RegisterHandler(value));
    setLoading(false);
    if (res) {
      router.push("/");
    }
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const headerSection = (
    <>
      <div className="p-3 text-center ">
        <h1 className="text-4xl dark:text-white ">Synaos Analysis</h1>
      </div>
      <div className="pb-3 text-center ">
        <h1 className="text-xl dark:text-white">Registration</h1>
      </div>
    </>
  );
  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <div className="flex min-h-screen  min-w-xs">
        <div className="m-auto justify-center align-middle w-full">
          <FormCard headerSection={headerSection} loading={loading}>
            <Form
              {...formItemLayout}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="username"
                label={<p className="dark:text-white">Username</p>}
                colon={false}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="first_name"
                label={<p className="dark:text-white">First Name</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                    whitespace: false,
                  },
                ]}
                colon={false}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="last_name"
                label={<p className="dark:text-white">Last Name</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                    whitespace: false,
                  },
                ]}
                colon={false}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label={<p className="dark:text-white">Email</p>}
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
                colon={false}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label={<p className="dark:text-white">Password</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
                colon={false}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label={<p className="dark:text-white">Confirm Password</p>}
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                colon={false}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  style={{ minWidth: "100%" }}
                  type="primary"
                  htmlType="antdSubmit"
                  loading={loading}
                >
                  Register
                </Button>
              </Form.Item>
              <div className="text-right">
                <Link href="/auth/login">
                  <a className="dark:text-white"> Login!</a>
                </Link>
              </div>
            </Form>
          </FormCard>
        </div>
      </div>
    </>
  );
};

export default register;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      await useUIThemeSetter(store, req);
      await useReqSetToken(store, req);
      if (store.getState().auth.token === null) return {};
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
);
