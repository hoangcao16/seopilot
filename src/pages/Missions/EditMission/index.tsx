import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select, Skeleton } from 'antd';
import ButtonComponent from 'components/ButtonComponent';
import LayoutHome from 'components/Layouts/LayoutHome';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { Helmet } from 'react-helmet';
import customAxios from 'services/ApiClient';
import { Mission } from 'types/Missions';
import { openNotification } from 'utils/openNotification';
import { Customer } from '../AddNewMission';

const communications = ['Google', 'Youtube'];
const missionsType = ['Chạy từ khóa', 'Chạy hình ảnh', 'Chạy link'];

export default function EditMission() {
  const { Option } = Select;
  const navigate = useNavigate();
  const { id } = useParams();

  const initMission: Mission = {
    communication: '',
    companyName: '',
    customerName: '',
    deadTime: 0,
    id: 0,
    keyWord: '',
    link: '',
    missionDetails: [],
    missionKey: '',
    missionType: '',
    moneyReceived: '',
    name: '',
    priceUnit: 0,
    quantity: 0,
    quantityMade: 0,
    customerKey: 0,
  };
  const [mission, setMission] = useState(initMission);
  const [loadingMission, setLoadingMission] = useState(false);

  const [customers, setCustomers] = useState([]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Bạn có chắc muốn xóa nhiệm vụ này?'
  );

  const onFinish = (values: any) => {
    const params = { ...values };

    customAxios
      .put(`${process.env.REACT_APP_API_URL}/missions/${id}`, params)
      .then((res) => {
        openNotification('success', 'Sửa nhiệm vụ thành công!');
        navigate('/missions');
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // const handleCancel = () => {
  //   navigate(-1);
  // };

  const onChangeInput = (e: any) => {
    if (e.target.type === 'number') {
      setMission({ ...mission, [e.target.name]: parseInt(e.target.value) });
    } else {
      setMission({ ...mission, [e.target.name]: e.target.value });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getValueSelect = (value: any) => {
    // console.log('Select: ', value);
  };

  const getAllCustomer = () => {
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/customers`)
      .then((res) => {
        setCustomers(res.data.data);
        // console.log('cus', res.data.data);
      });
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  useEffect(() => {
    setLoadingMission(true);
    customAxios
      .get(`${process.env.REACT_APP_API_URL}/missions/${id}`)
      .then((res) => {
        setMission(res.data);
        setLoadingMission(false);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoadingMission(false);
      });
  }, [id]);

  // ========= Model delete =====================
  const showModalConfirmDelete = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('Đang xóa nhiệm vụ...');
    setConfirmLoading(true);

    customAxios
      .delete(`${process.env.REACT_APP_API_URL}/missions/${mission.id}`)
      .then((res) => {
        openNotification('success', 'Xóa nhiệm vụ thành công!');
        navigate('/missions');
        setConfirmLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    // console.log('Đã hủy hành động');
    setVisible(false);
  };

  return (
    <LayoutHome>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chi tiết - Quản lý nhiệm vụ</title>
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
        <h3>Chi tiết nhiệm vụ</h3>

        {loadingMission ? (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <Form
            name="basic"
            initialValues={mission}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.wrapperForm}
          >
            <Form.Item
              name="missionKey"
              rules={[
                {
                  required: true,
                  message: 'Mời mã nhiệm vụ!',
                },
              ]}
            >
              <div className={styles.rowInput}>
                <p>Mã nhiệm vụ</p>
                <Input
                  name="missionKey"
                  placeholder="Nhập mã nhiệm vụ"
                  value={`${mission.missionKey}`}
                  disabled
                />
              </div>
            </Form.Item>

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
                <Input
                  name="name"
                  placeholder="Nhập tên nhiệm vụ"
                  value={`${mission.name}`}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="communication"
              className={styles.select_item}
              label="Nền tảng"
              rules={[
                {
                  required: true,
                  message: 'Chọn nền tảng',
                },
              ]}
            >
              <Select
                onChange={getValueSelect}
                placeholder="Chọn nền tảng"
                className={styles.select}
                value={mission.communication}
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
                  message: 'Mời chọn loại nhiệm vụ!',
                },
              ]}
            >
              <Select
                placeholder="Chọn loại nhiệm vụ"
                className={styles.select}
                onChange={getValueSelect}
                value={mission.missionType}
              >
                {missionsType.map((item: string) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="customerId"
              label="Tên khách hàng"
              className={styles.select_item}
              // rules={[
              //   {
              //     required: true,
              //     message: 'Mời chọn khách hàng',
              //   },
              // ]}
            >
              <Select
                onChange={getValueSelect}
                placeholder="Chọn khách hàng"
                className={styles.select}
                defaultValue={mission.customerName}
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
                <Input
                  name="keyWord"
                  placeholder="Nhập tên từ khóa"
                  value={`${mission.keyWord}`}
                  onChange={onChangeInput}
                />
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
                <Input
                  name="link"
                  placeholder="Nhập link"
                  value={`${mission.link}`}
                  onChange={onChangeInput}
                />
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
                  name="quantity"
                  placeholder="Nhập số lượt tìm kiếm mong muốn"
                  type="number"
                  value={`${mission.quantity}`}
                  onChange={onChangeInput}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="quantityMade"
              rules={[
                {
                  required: true,
                  message: 'Mời nhập số lượt tìm kiếm đã thực hiện!',
                },
              ]}
            >
              <div className={styles.rowInput}>
                <p>Số lượt tìm kiếm đã thực hiện</p>
                <Input
                  name="quantityMade"
                  type="number"
                  value={`${mission.quantityMade}`}
                  // onChange={onChangeInput}
                  disabled
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
                  name="priceUnit"
                  placeholder="---------- vnđ/lượt"
                  type="number"
                  onChange={onChangeInput}
                  value={`${mission.priceUnit}`}
                />
              </div>
            </Form.Item>

            <Form.Item>
              <div className={styles.rowInput}>
                <p>Thành tiền</p>
                <Input
                  value={`${mission.priceUnit * mission.quantity}`}
                  onChange={onChangeInput}
                />
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
                  onClick={showModalConfirmDelete}
                >
                  Xóa
                </ButtonComponent>

                <ButtonComponent
                  type="primary"
                  width={120}
                  height={48}
                  borderRadius={4}
                  htmlType="submit"
                >
                  Lưu
                </ButtonComponent>
              </div>
            </Form.Item>
          </Form>
        )}
      </div>

      <Modal
        title="Xác nhận xóa Nhiệm vụ"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Không"
      >
        <p>{modalText}</p>
      </Modal>
    </LayoutHome>
  );
}
