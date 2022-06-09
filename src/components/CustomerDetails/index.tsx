import { Button, Row, Col, Modal, Upload } from 'antd';
import avatar from './avatar.png';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUsersContext } from 'context/userContext';
import { InforCustomer } from 'types/customerInterfaces';
import { UserOutlined } from '@ant-design/icons';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';
import userEvent from '@testing-library/user-event';
interface DetailContainerProps {
  id: any;
  customer: InforCustomer;
  handleSetCustomer: any;
}

// export interface CustomersDetails {
//   //customer: Array<InforCustomer>;
// }

export default function DetailsCus(props: DetailContainerProps) {
  const navigate = useNavigate();
  const { id, customer, handleSetCustomer } = props;
  const { isDetailCustomer, setIsDetailCustomer } = useUsersContext();
  const [isEditPage, setIsEditPage] = useState(true);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Bạn có chắc muốn xóa khách hàng này?'
  );

  const Delete = () => {
    setVisible(true);
  };
  const numeral = require('numeral');

  const Edit = () => {
    setIsDetailCustomer(false);
    setIsEditPage(false);
  };
  const Back = () => {
    isEditPage ? navigate(-1) : setIsDetailCustomer(true);
  };

  const Save = () => {
    customAxios
      .put(
        `${process.env.REACT_APP_API_URL}/api/v1/customers/${customer.id}?name=${customer.name}&phone=${customer.phone}`,
        customer
      )
      .then((res) => {
        openNotification('success', 'Sửa thông tin thành công!');
        navigate('/customers');
      })
      .catch((err) => {
        openNotification(
          'error',
          'Sửa thông tin không thành công!',
          'Kiểm tra lại các trường thông tin.'
        );
      });
  };
  const onChange = (e: any) => {
    handleSetCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setModalText('Đang xóa khách hàng...');
    setConfirmLoading(true);

    customAxios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/v1/customers/delete?id=${customer.id}`
      )
      .then((res) => {
        setVisible(false);
        setConfirmLoading(false);
        openNotification('success', 'Xóa thành công');
        navigate('/customers');
      })
      .catch((err) => {
        openNotification('error', 'Xóa thất bại');
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleChange = (info: any) => {
    const formData = new FormData();
    formData.set('avatar', info.file.originFileObj);
    customAxios
      .post(`${process.env.REACT_APP_API_URL}/image/`, formData)
      .then((res) => {
        handleSetCustomer({ ...customer, avatar: res.data });
      });
  };
  return (
    <div className={styles.Detail}>
      <div className={styles.Banner}>
        <Upload
          name="avatar"
          listType="picture-card"
          className={styles.PicLoad}
          showUploadList={false}
          onChange={handleChange}
          //style={{ width: '5%' }}
        >
          {customer.avatar === '' ? (
            <div>
              <UserOutlined />
            </div>
          ) : (
            <img src={customer.avatar} alt="avatar" style={{ width: '100%' }} />
          )}
        </Upload>
        <p
          style={{
            margin: '14px 0px',
          }}
        >
          {customer.name}
        </p>
      </div>
      <div className={styles.Infor}>
        <Row className={styles.InforItem}>
          <Col span={5}>
            <label>Mã khách hàng</label>
          </Col>
          <Col span={19}>
            <input type="text" value={`${customer.customerKey}`} readOnly />
          </Col>
        </Row>
        <Row className={styles.InforItem}>
          <Col span={5}>
            <label htmlFor="Name">Tên khách hàng</label>
          </Col>
          <Col span={19}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={'Nhập tên khách hàng'}
              value={`${customer.name}`}
              readOnly={isDetailCustomer ? true : false}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row className={styles.InforItem}>
          <Col span={5}>
            <label htmlFor="Email">Email</label>
          </Col>
          <Col span={19}>
            <input type="text" value={`${customer.email}`} readOnly />
          </Col>
        </Row>
        <Row className={styles.InforItem}>
          <Col span={5}>
            <label>Số điện thoại</label>
          </Col>
          <Col span={19}>
            <input
              name="phone"
              id="phone"
              type="text"
              placeholder="Nhập số điện thoại"
              value={`${customer.phone}`}
              readOnly={isDetailCustomer ? true : false}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row className={styles.InforItem}>
          <Col span={5}>
            <label>Số tiền còn lại</label>
          </Col>
          <Col span={19}>
            <input
              type="text"
              readOnly
              value={numeral(`${customer.moneyRemaining}`).format(',') + ' vnđ'}
            />
          </Col>
        </Row>
        <Row className={styles.InforItem}>
          <Col span={5}>
            <label>Số tiền khả dụng</label>
          </Col>
          <Col span={19}>
            <input
              type="text"
              readOnly
              value={numeral(`${customer.moneyAvailable}`).format(',') + ' vnđ'}
            />
          </Col>
        </Row>
        <div className={styles.btn}>
          <Button
            type="primary"
            onClick={() => navigate(`/customers/${id}/deposited`)}
            key={`/customers/${id}/deposited`}
          >
            <span>Xem lịch sử nạp tiền</span>
          </Button>
        </div>

        <div className={styles.Mission}>
          <p className={styles.MissionContent}>Nhiệm vụ đang chạy:</p>
          <div>
            {customer.missionList.map((e) => {
              if (e.status === 'RUN') {
                return (
                  <p className={styles.MissionItem} key={e.id}>
                    {e.name}
                  </p>
                );
              }
            })}
          </div>
        </div>

        <div className={styles.btn}>
          <Button type="primary">Xem tất cả</Button>
        </div>
        <div className={styles.Mission}>
          <p className={styles.MissionContent}>Nhiệm vụ hoàn thành:</p>
          <div>
            {customer.missionList.map((e) => {
              if (e.status === 'COMPLETE') {
                return (
                  <p className={styles.MissionItem} key={e.id}>
                    {e.name}
                  </p>
                );
              }
            })}
          </div>
        </div>

        <div className={styles.btn}>
          <Button type="primary">Xem tất cả</Button>
        </div>
      </div>
      {isDetailCustomer ? (
        <div className={styles.ClickButton}>
          <Button onClick={Delete}>Xóa</Button>
          <div className={styles.btnConfirm}>
            <Button onClick={Edit} type="primary">
              Sửa
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.ClickButton}>
          <Button onClick={Back}>Hủy</Button>
          <div className={styles.btnConfirm}>
            <Button onClick={Save} type="primary">
              Lưu
            </Button>
          </div>
        </div>
      )}
      <Button
        className={styles.btnBack}
        type="primary"
        onClick={() => navigate(-1)}
      >
        Trở về
      </Button>
      <Modal
        title="Xác nhận xóa khách hàng"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Không"
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}
