import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.css'
import { useNavigate , Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const LoginTaxiDriver = () => {
  const [error,setError] = useState(false);
  const nav = useNavigate();
  const onFinish = async(values) => {
    console.log(values)
    try {
      const response = await axios.post('http://localhost:8081/api/taxi/login',values);
  
      if (response.status === 200) {
        // Request was successful
        const data = response.data;
        console.log(data[0].id);
        localStorage.setItem('userid',data[0].id);
        
        nav("/driver")
      }else if (response.status === 404) {
        // Request was successful

        console.log("username or password is wrong")
        
      }else {
        // Request was not successful

        console.error('API request failed with status:', response.status);
      }
    } catch (error) {
      setError(true);
      console.error('An error occurred:', error);
    }
  };
  return (
    <div className='login_ctn'>
    <div className='login_card'>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {error &&
      <p style={{color:"red"}}>Incorrect username or password</p>
}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
      
        <Button type="primary" htmlType="submit" className="login-form-button" >
          Log in
        </Button>
        Or <Link to="/register/taxi-driver">register now!</Link>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};
export default LoginTaxiDriver;