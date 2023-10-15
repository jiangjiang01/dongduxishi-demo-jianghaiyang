import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const jumpToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    // 判断是否存在 token
    const token: string | null = localStorage.getItem('token');
    if (token === null) {
      jumpToLogin();
      return;
    }

    // 请求信息展示
    axios({
      method: 'get',
      url: `https://clare1.ngrok.io/api/v1/welcome/${token}`,
    })
      .then(function (response: unknown) {
        setContent(response as string);
      })
      .catch(function (error) {
        console.log('welcome error', error);
        message.error('token错误');
        jumpToLogin();
      });

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>欢迎页</h1>
      <div>{content}</div>
    </div>
  );
}

export default Home;
