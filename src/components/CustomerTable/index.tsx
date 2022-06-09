import { Table, Space, Popconfirm } from 'antd';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ColumnsType } from 'antd/es/table';
import styles from './styles.module.scss';
import { Customer } from '../../types/customerInterfaces';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from 'context/userContext';
import SvgIcons from 'components/SvgIcons';

export interface CustomersTableProps {
  customer: Array<Customer>;
  deleteCustomer: Function;
}
var numeral = require('numeral');

export default function CustomerTable(props: CustomersTableProps) {
  const { customer, deleteCustomer } = props;
  const text = 'Bạn có muốn xoá người này?';
  const confirm = (e: any, cus: any) => {
    deleteCustomer(cus.id);
  };

  const navigate = useNavigate();
  const { setIsDetailCustomer } = useUsersContext();
  function itemRender(current: any, type: any, originalElement: any) {
    if (type === 'prev') {
      return <a>Sau</a>;
    }
    if (type === 'next') {
      return <a>Tiếp</a>;
    }
    return originalElement;
  }
  const columns: ColumnsType<Customer> = [
    {
      key: 'id',
      title: 'Mã khách hàng',
      dataIndex: 'id',
      align: 'center',
      render: (text, record: any) => {
        return <span>{record.customerKey}</span>;
      },
    },
    {
      key: 'name',
      title: 'Tên khách hàng',
      dataIndex: 'name',
    },
    {
      key: 'phone',
      title: 'Số điện thoại',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      key: 'mission',
      title: 'Số nhiệm vụ đang chạy',
      dataIndex: 'mission',
      align: 'center',
      render: (text, record: any) => {
        return <span>{Object.keys(record.missionList).length}</span>;
      },
    },
    {
      key: 'amount',
      title: 'Số dư tài khoản còn lại',
      dataIndex: 'amount',
      align: 'center',
      render: (text, record: any) => (
        <Space>
          <p className={styles.Text}>
            {numeral(record.moneyRemaining).format(',')} vnđ
          </p>
        </Space>
      ),
    },
    {
      key: 'action',
      title: 'Tác vụ',
      align: 'center',
      render: (record: any) => {
        return (
          <Space size="middle">
            <SvgIcons
              name="detail"
              onClick={() => {
                setIsDetailCustomer(true);
                navigate(`/customers/${record.id}`);
              }}
            />
            <SvgIcons
              name="edit"
              onClick={() => {
                setIsDetailCustomer(false);
                navigate(`/customers/${record.id}`);
              }}
            />
            <Popconfirm
              placement="topRight"
              title={text}
              onConfirm={(e) => confirm(e, record)}
              okText="Yes"
              cancelText="No"
            >
              <SvgIcons name="delete" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className={styles.UserTable}>
      <Table
        pagination={{
          itemRender: itemRender,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        columns={columns}
        dataSource={customer}
      />
    </div>
  );
}
