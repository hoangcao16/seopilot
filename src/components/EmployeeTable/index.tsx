/* eslint-disable jsx-a11y/anchor-is-valid */
import { Popconfirm, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import SvgIcons from 'components/SvgIcons';
import { useUsersContext } from 'context/userContext';
import { useNavigate } from 'react-router-dom';
import { EmployeeProps } from '../../types/EmployeeInterface';
import styles from './styles.module.scss';

export interface EmployeeTableProps {
  employees: Array<EmployeeProps>;
  deleteEmployeeById: Function;
}

export default function EmployeeTable(props: EmployeeTableProps) {
  const navigate = useNavigate();
  const context = useUsersContext();
  const { employees, deleteEmployeeById } = props;

  const itemRender = (current: any, type: any, originalElement: any) => {
    if (type === 'prev') {
      return <a>Sau</a>;
    }
    if (type === 'next') {
      return <a>Tiếp</a>;
    }
    return originalElement;
  };

  //Confirm delete
  const text = 'Bạn có muốn xoá người này?';

  const confirm = (e: any, user: any) => {
    deleteEmployeeById(user.id);
  };

  const columns: ColumnsType<EmployeeProps> = [
    {
      key: 'id',
      title: 'Mã nhân viên',
      dataIndex: 'id',
      align: 'left',
      render: (text: any, record: any) => {
        return <span>NV{record.id}</span>;
      },
    },
    {
      key: 'name',
      title: 'Tên nhân viên',
      dataIndex: 'name',
      align: 'left',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      align: 'left',
    },
    {
      key: 'phone',
      title: 'Số điện thoại',
      dataIndex: 'phone',
      align: 'left',
    },
    {
      key: 'action',
      title: 'Tác vụ',
      align: 'center',
      render: (record: any) => {
        return (
          <Space size="middle">
            <Tooltip title="Chi tiết">
              <SvgIcons
                name="detail"
                onClick={() => {
                  context.setIsDetailEmployee(true);
                  navigate(`/employees/${record.id}`);
                }}
              />
            </Tooltip>

            <Tooltip title="Sửa">
              <SvgIcons
                name="edit"
                onClick={() => {
                  context.setIsDetailEmployee(false);
                  navigate(`/employees/${record.id}`);
                }}
              />
            </Tooltip>

            <Tooltip title="Xóa">
              <Popconfirm
                placement="topRight"
                title={text}
                onConfirm={(e) => confirm(e, record)}
                okText="Yes"
                cancelText="No"
              >
                <SvgIcons name="delete" />
              </Popconfirm>
            </Tooltip>
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
          // onShowSizeChange: onShowSizeChange,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        className={styles.pagination}
        columns={columns}
        dataSource={employees}
      />
    </div>
  );
}
