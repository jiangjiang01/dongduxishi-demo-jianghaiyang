import { useState } from 'react';
import { Row, Col, message, Form, Button, Input } from 'antd';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import axios from 'axios';

import LoginBg from '../assets/loginBg.png';
import AppleLogo from '../assets/appleLogo.png';
import GoogleLogo from '../assets/googleLogo.png';

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: 'https://clare1.ngrok.io/api/v1/login',
      data: {
        name,
        password,
      },
    })
      .then(function (response: unknown) {
        console.log(response);
        // 获取接口显示
        message.success('xxx');
        welcome(response as string);
      })
      .catch(function (error) {
        console.log(error);
        message.error('用户名或者密码错误');
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const welcome = (token: string) => {
    axios({
      method: 'get',
      url: `https://clare1.ngrok.io/api/v1/welcome/${token}`,
    })
      .then(function (response: unknown) {
        message.success(response as string);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <Row>
        <Col span={12} className="login-left">
          <div className="login-bg">
            <img src={LoginBg} />
          </div>
          <Row gutter={12}>
            <Col offset={4} span={8}>
              <img className="login-logo" src={AppleLogo} />
            </Col>
            <Col span={8}>
              <img className="login-logo" src={GoogleLogo} />
            </Col>
          </Row>
        </Col>
        <Col className="login-right" span={12}>
          <div
            style={{
              marginTop: '20%',
              marginBottom: 30,
              color: 'hsl(129.63deg 33.61% 47.25%)',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            Login
          </div>
          <Form layout="vertical">
            <Form.Item label="Email">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                prefix={<MailOutlined />}
                placeholder="enter your email"
              />
            </Form.Item>
            <Form.Item label="password">
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<KeyOutlined />}
                type="password"
                placeholder="enter your password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                block
                loading={loading}
                style={{ background: 'hsl(129.63deg 33.61% 47.25%)' }}
                onClick={login}
                type="primary"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
