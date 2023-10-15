import { useState } from 'react';
import {
  Row,
  Col,
  message,
  Form,
  Button,
  Input,
  Checkbox,
  ConfigProvider,
} from 'antd';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from './login.module.less';

import LoginBg from '../../assets/loginBg.png';
import AppleLogo from '../../assets/appleLogo.png';
import GoogleLogo from '../../assets/googleLogo.png';
import { useNavigate } from 'react-router-dom';

type LoginFieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const jumpToHome = () => {
    navigate('/home', {
      relative: 'path',
    });
  };

  const onFinish = (values: LoginFieldType) => {
    setLoading(true);
    axios({
      method: 'post',
      url: 'https://clare1.ngrok.io/api/v1/login',
      data: {
        name: values.username,
        password: values.password,
      },
    })
      .then(function (response: unknown) {
        localStorage.setItem('token', response as string);
        jumpToHome();
        message.success('登录成功');
      })
      .catch(function (error) {
        console.log(error);
        message.error('用户名或者密码错误');
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const handleForgot = () => {
    message.warning('待实现');
  };

  return (
    <div className={styles['login-container']}>
      <Row>
        <Col span={12} className={styles['login-left']}>
          <div className={styles['login-bg']}>
            <img src={LoginBg} />
          </div>
          <Row gutter={12}>
            <Col offset={4} span={8}>
              <img className={styles['login-logo']} src={AppleLogo} />
            </Col>
            <Col span={8}>
              <img className={styles['login-logo']} src={GoogleLogo} />
            </Col>
          </Row>
        </Col>
        <Col className={styles['login-right']} span={12}>
          <div
            style={{
              marginTop: '20%',
              marginBottom: 30,
              color: '#23A455',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            Login
          </div>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  labelColor: '#666',
                },
              },
            }}
          >
            <Form
              layout="vertical"
              className={styles['login-form']}
              autoComplete="off"
              initialValues={{ remember: false }}
              onFinish={onFinish}
            >
              <Form.Item<LoginFieldType>
                label="Email"
                name="username"
                required={false}
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input
                  addonBefore={<MailOutlined />}
                  placeholder="enter your email"
                />
              </Form.Item>
              <Form.Item<LoginFieldType>
                label="password"
                name="password"
                required={false}
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  addonBefore={<KeyOutlined />}
                  type="password"
                  placeholder="enter your password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item<LoginFieldType>
                  name="remember"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox style={{ color: '#666' }}>Remember me</Checkbox>
                </Form.Item>
                <a
                  className={styles['login-forget-link']}
                  onClick={handleForgot}
                  href="#"
                >
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  loading={loading}
                  style={{ background: '#23A455)' }}
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
