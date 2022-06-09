import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import ButtonComponent from 'components/ButtonComponent';
import LayoutHome from 'components/Layouts/LayoutHome';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
import styles from './styles.module.scss';

const communications = ['Google', 'Youtube'];
const missions = ['Chạy từ khóa', 'Chạy hình ảnh', 'Chạy link'];

export interface Customer {
  avatar: string;
  companyName: string;
  customerKey: string;
  email: string;
  id: number;
  missionList: Array<any>;
  moneyAvailable: number;
  moneyRemaining: number;
  name: string;
  phone: string;
  transaction: Array<any>;
}

export default function AddNewMission() {
  const { Option } = Select;
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const [quantity, setQuantity] = useState(0);
  const [priceUnit, setPriceUnit] = useState(0);

  const getAllCustomer = () => {
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/customers`)
      .then((res) => {
        setCustomers(res.data.data);
      });
  };

  const onFinish = (values: any) => {
    const param = { ...values, moneyReceived: quantity * priceUnit };
    customAxios
      .post(`${process.env.REACT_APP_API_URL}/missions`, param)
      .then((res) => {
        openNotification('success', 'Thêm nhiệm vụ thành công!');
        navigate('/missions');
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getValueSelect = (value: any) => {
    // console.log('Select: ', value);
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  return (
    <LayoutHome>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thêm mới - Quản lý nhiệm vụ</title>
      </Helmet>
      <div className={styles.wrapper}>
        <ButtonComponent
          type="white"
          width={40}
          height={30}
          borderRadius={8}
          onClick={handleGoBack}
        >
          <ArrowLeftOutlined />
        </ButtonComponent>
        <h3>Thêm mới nhiệm vụ</h3>

        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.wrapperForm}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Mời nhập tên nhiệm vụ!',
              },
            ]}
          >
            <div className={styles.rowInput}>
              <p>Tên nhiệm vụ</p>
              <Input placeholder="Nhập tên nhiệm vụ" />
            </div>
          </Form.Item>

          <Form.Item
            name="communication"
            label="Nền tảng"
            className={styles.select_item}
            rules={[
              {
                required: true,
                message: 'Nền tảng',
              },
            ]}
          >
            <Select
              onChange={getValueSelect}
              placeholder="Chọn nền tảng"
              className={styles.select}
            >
              {communications.map((item: string) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="missionType"
            className={styles.select_item}
            label="Loại nhiệm vụ"
            rules={[
              {
                required: true,
                message: 'Mời nhập tên nhiệm vụ!',
              },
            ]}
          >
            <Select
              placeholder="Chọn loại nhiệm vụ"
              className={styles.select}
              onChange={getValueSelect}
            >
              {missions.map((item: string) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="customerId"
            className={styles.select_item}
            label="Tên khách hàng"
            rules={[
              {
                required: true,
                message: 'Mời nhập tên khách hàng!',
              },
            ]}
          >
            <Select
              onChange={getValueSelect}
              placeholder="Chọn khách hàng"
              className={styles.select}
            >
              {customers.map((item: Customer) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="keyWord"
            rules={[
              {
                required: true,
                message: 'Mời nhập tên từ khóa!',
              },
            ]}
          >
            <div className={styles.rowInput}>
              <p>Tên từ khóa</p>
              <Input placeholder="Nhập tên từ khóa" />
            </div>
          </Form.Item>

          <Form.Item
            name="link"
            rules={[
              {
                required: true,
                message: 'Mời nhập link!',
              },
            ]}
          >
            <div className={styles.rowInput}>
              <p>Link</p>
              <Input placeholder="Nhập link" />
            </div>
          </Form.Item>

          <Form.Item
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Mời nhập số lượt tìm kiếm mong muốn!',
              },
            ]}
          >
            <div className={styles.rowInput}>
              <p>Số lượt tìm kiếm mong muốn</p>
              <Input
                placeholder="Nhập số lượt tìm kiếm mong muốn"
                type="number"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                suffix="lượt"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="priceUnit"
            rules={[
              {
                required: true,
                message: 'Mời nhập đơn giá!',
              },
            ]}
          >
            <div className={styles.rowInput}>
              <p>Đơn giá</p>
              <Input
                placeholder="---------- vnđ/lượt"
                type="number"
                onChange={(e) => setPriceUnit(parseInt(e.target.value))}
                suffix="vnđ/lượt"
              />
            </div>
          </Form.Item>

          <Form.Item>
            <div className={styles.rowInput}>
              <p>Thành tiền</p>
              <Input value={quantity * priceUnit} />
            </div>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 14,
            }}
          >
            <div className={styles.rowInput}>
              <ButtonComponent
                type="outline"
                width={120}
                height={48}
                borderRadius={4}
                htmlType="button"
                onClick={handleCancel}
              >
                Hủy
              </ButtonComponent>

              <ButtonComponent
                type="primary"
                width={120}
                height={48}
                borderRadius={4}
                htmlType="submit"
              >
                Tạo
              </ButtonComponent>
            </div>
          </Form.Item>
        </Form>
      </div>
    </LayoutHome>
  );
}
