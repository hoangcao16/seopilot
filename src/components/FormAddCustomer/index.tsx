import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Upload, message } from 'antd';
import styles from './styles.module.scss';
import { UserOutlined } from '@ant-design/icons';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
import { useNavigate } from 'react-router-dom';

export default function From() {
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const param = { ...values, avatar: avatar };
    customAxios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/customers/add`, param)
      .then((res) => {
        navigate('/api/v1/customers/add');
        openNotification('success', 'Thông báo', 'Thêm khách hàng thành công!');
      })
      .catch((err) => {
        openNotification(
          'error',
          'Không thành công!',
          'Kiểm tra lại các trường nhập vào.'
        );
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (info: any) => {
    const formData = new FormData();
    formData.set('avatar', info.file.originFileObj);
    customAxios
      .post(`${process.env.REACT_APP_API_URL}/image/`, formData)
      .then((res) => {
        setAvatar(res.data);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.loadfile}>
        <Upload
          name="avatar"
          listType="picture-card"
          className={styles.avatarUploader}
          showUploadList={false}
          onChange={handleChange}
          style={{ width: '48px', height: '48px' }}
        >
          {avatar.trim() === '' ? (
            <div>
              <UserOutlined />
            </div>
          ) : (
            <img src={avatar} alt="avatar" style={{ width: '100%' }} />
          )}
        </Upload>
        <div
          style={{
            color: '#303030',
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 500,
            margin: '14px 8px',
          }}
        >
          Chọn avatar
        </div>
      </div>
      <Form
        className={styles.form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          className={styles.item}
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên khách hàng',
            },
          ]}
        >
          <Row style={{ alignItems: 'center' }}>
            <Col span={5}>
              <label
                style={{
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
                }}
              >
                Tên khách hàng
              </label>
            </Col>
            <Col span={19}>
              <Input
                placeholder="Nhập tên khách hàng"
                className={styles.input}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="email"
          className={styles.item}
          rules={[
            {
              required: true,
              message: 'Hãy nhập email',
            },
          ]}
        >
          <Row style={{ alignItems: 'center' }}>
            <Col span={5}>
              <label
                style={{
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
                }}
              >
                Email
              </label>
            </Col>
            <Col span={19}>
              <Input placeholder="Nhập email" className={styles.input} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="password"
          className={styles.item}
          rules={[
            {
              required: true,
              message: 'Hãy nhập mật khẩu',
            },
          ]}
        >
          <Row style={{ alignItems: 'center' }}>
            <Col span={5}>
              <label
                style={{
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
                }}
              >
                Mật khẩu
              </label>
            </Col>
            <Col span={19}>
              <Input.Password
                placeholder="Nhập mật khẩu"
                className={styles.input}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="phone"
          className={styles.item}
          rules={[
            {
              required: true,
              message: 'Hãy nhập số điện thoại',
            },
          ]}
        >
          <Row style={{ alignItems: 'center' }}>
            <Col span={5}>
              <label
                style={{
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
                }}
              >
                Số điện thoại
              </label>
            </Col>
            <Col span={19}>
              <Input
                placeholder="Nhập số điện thoại"
                className={styles.input}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="companyName"
          className={styles.item}
          rules={[
            {
              required: true,
              message: 'Hãy nhập doanh nghiệp',
            },
          ]}
        >
          <Row style={{ alignItems: 'center' }}>
            <Col span={5}>
              <label
                style={{
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
                }}
              >
                Tên doanh nghiệp
              </label>
            </Col>
            <Col span={19}>
              <Input
                placeholder="Nhập tên doanh nghiệp"
                className={styles.input}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div className={styles.button}>
            <Button
              className={`${styles.btn} ${styles.clickback}`}
              style={{ border: '1px solid #6d7075' }}
            >
              <Link to="/customers">
                <span>Hủy </span>
              </Link>
            </Button>

            <Button type="primary" htmlType="submit" className={styles.btn}>
              Tạo
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
