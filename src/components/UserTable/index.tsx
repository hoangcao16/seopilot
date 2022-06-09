import { Table, Space, Popconfirm, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { User } from 'types/userInterfaces';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from '../../context/userContext';
import SvgIcons from 'components/SvgIcons';
var numeral = require('numeral');
export interface UsersTableProps {
  user: Array<User>;
  deleteUser: Function;
}
export default function UserTable(props: UsersTableProps) {
  const { user, deleteUser } = props;
  const text = 'Bạn có muốn xoá người này?';
  const confirm = (e: any, user: any) => {
    deleteUser(user.id);
  };
  const navigate = useNavigate();
  const { setIsDetail } = useUsersContext();
  const itemRender = (current: any, type: any, originalElement: any) => {
    if (type === 'prev') {
      return (
        <a href="/#" onClick={(e) => e.preventDefault()}>
          Sau
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a href="/#" onClick={(e) => e.preventDefault()}>
          Tiếp
        </a>
      );
    }
    return originalElement;
  };

  // Handle ViewDetail
  const columns: ColumnsType<User> = [
    {
      key: 'ID',
      title: 'Mã người dùng',
      dataIndex: 'ID',
      align: 'center',
      render: (text, record: any) => {
        return <span>{record.userKey}</span>;
      },
    },
    {
      key: 'name',
      title: 'Tên người dùng',
      dataIndex: 'name',
      align: 'center',
    },
    {
      key: 'phone',
      title: 'Số điện thoại',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      key: 'mission',
      title: 'Số nhiệm vụ đã làm',
      dataIndex: 'mission',
      align: 'center',
      render: (text, record: any) => {
        return <span>{Object.keys(record.missionDetailList).length}</span>;
      },
    },
    {
      key: 'amount',
      title: 'Số tiền kiếm được',
      dataIndex: 'amount',
      align: 'center',
      render: (text, record: any) => (
        <Space>
          <p className={styles.Text}>
            {numeral(record.amountMoneyReceive).format(',')} vnđ
          </p>
        </Space>
      ),
    },
    {
      key: 'cash',
      title: 'Số tiền còn lại',
      dataIndex: 'cash',
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
                setIsDetail(true);
                navigate(`/users/${record.id}`);
              }}
            />
            <SvgIcons
              name="edit"
              onClick={() => {
                setIsDetail(false);
                navigate(`/users/${record.id}`);
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
    <div>
      <Table
        pagination={{
          itemRender: itemRender,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        className={styles.UserTable}
        columns={columns}
        dataSource={user}
      />
    </div>
  );
}
