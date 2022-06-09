import LayoutFormLogin from 'components/FormLogin';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import stylesInput from '../../styles/inputLogin.module.scss';
import stylesButton from '../../styles/buttonLogin.module.scss';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
import { useOTPContext } from 'context/otpContext';
export interface EmailForgotProps {
  email: string;
}
const EmailForgot = () => {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const otpContext = useOTPContext();

  const onFinish = (values: EmailForgotProps) => {
    setSending(true);
    customAxios
      .post(`${process.env.REACT_APP_API_URL}/forgot`, values)
      .then((res) => {
        openNotification('success', 'Kiểm tra mã OTP của bạn trong email!');
        setSending(false);
        navigate('/otp');
        otpContext.setId(parseInt(res.data.accountId));
      })
      .catch((err) => {
        setSending(false);
        openNotification(
          'error',
          err.data.message,
          'Kiểm tra lại email vừa nhập!'
        );
      });
  };

  const handleBackLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate('/login');
  };
  return (
    <LayoutFormLogin>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Email trống!' }]}
        >
          <Input
            type="email"
            placeholder="Nhập email"
            className={`email-forgot ${stylesInput.input}`}
          />
        </Form.Item>

        <div className={styles.group_input}>
          <Button
            className={stylesButton.primary}
            htmlType="submit"
            loading={sending}
          >
            Tiếp tục
          </Button>
          <Button
            className={stylesButton.white}
            htmlType="button"
            onClick={handleBackLogin}
          >
            Quay lại
          </Button>
        </div>
      </Form>{' '}
    </LayoutFormLogin>
  );
};

export default EmailForgot;
