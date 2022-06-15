import { LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import { Button, Form, Input } from "antd";
import FormCard from "components/UI/FormCard";
import { useAppDispatch } from "hooks/hook";
import useReqSetToken from "hooks/useReqSetToken";
import useUIThemeSetter from "hooks/useUIThemeSetter";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { LoginHandler } from "store/feature/auth/authSlice";
import { wrapper } from "store/store";
import { useRouter } from "next/router";
const login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    let res = await dispatch(LoginHandler(values.username, values.password));
    setLoading(false);
    if (res) {
      router.push("/");
    }
  };
  const headerSection = (
    <>
      <div className="p-3 text-center ">
        <h1 className="text-4xl dark:text-white ">Synaos Analysis</h1>
      </div>
      <div className="pb-3 text-center ">
        <h1 className="text-xl dark:text-white">Sign in</h1>
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex min-h-screen  min-w-xs">
        <div className="m-auto justify-center align-middle w-full">
          <FormCard headerSection={headerSection} loading={loading}>
            <Form onFinish={onFinish} title="Sign In">
              <Form.Item
                name="username"
                colon={false}
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserIcon className="min-w-[20px]" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                colon={false}
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockClosedIcon className="min-w-[20px]" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="antdSubmit"
                  style={{ minWidth: "100%" }}
                >
                  Log in
                </Button>
                <Link href="/auth/register">
                  <a className="dark:text-white"> register now!</a>
                </Link>
              </Form.Item>
            </Form>
          </FormCard>
        </div>
      </div>
    </>
  );
};

export default login;

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
