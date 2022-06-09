import { Pagination, Popconfirm, Space, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import LayoutHome from 'components/Layouts/LayoutHome';
import SvgIcons from 'components/SvgIcons';
import MissionsHeaderContainer from 'containers/MissionsHeaderContainer';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import customAxios from 'services/ApiClient';
import { Mission } from 'types/Missions';
import { openNotification } from 'utils/openNotification';
import styles from './styles.module.scss';

export interface columnsTableMissions {
  id: string;
  title: string;
  dataIndex: string;
  key: string;
  fixed: string;
  width: number;
  ellipsis?: boolean;
  missionKey: string;
  name?: string;
}

export default function Missions() {
  const initMissions: Array<Mission> = [];
  const [missions, setMissions] = useState(initMissions);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const handleEdit = () => {
    // console.log('hanle Edit');
  };

  function confirm(e: any, mission: any) {
    customAxios
      .delete(`${process.env.REACT_APP_API_URL}/missions/${mission.id}`)
      .then((res) => {
        openNotification('success', 'Xóa nhiệm vụ thành công!');
        setPageIndex(1);
        setPageSize(1);
        getAllMissions(pageIndex, pageSize);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getAllMissions = (pageIndex: number, pageSize: number) => {
    setIsLoading(true);

    let url = `${process.env.REACT_APP_API_URL}/missions/?pageIndex=${pageIndex}&pageSize=${pageSize}`;

    customAxios
      .get(url)
      .then((res) => {
        setMissions(res.data.missionResponseList);
        setTotalItems(res.data.totalItems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  function cancel(e: any) {}

  const columns: ColumnsType<columnsTableMissions> = [
    {
      title: 'Mã nhiệm vụ',
      dataIndex: 'missionKey',
      key: 'missionKey',
      fixed: 'left',
      width: 110,
    },
    {
      title: 'Tên nhiệm vụ',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Nền tảng',
      dataIndex: 'communication',
      key: 'communication',
    },
    {
      title: 'Loại nhiệm vụ',
      dataIndex: 'missionType',
      key: 'missionType',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Số lượt đăng ký',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Số lượt đã thực hiện',
      dataIndex: 'quantityMade',
      key: 'quantityMade',
    },
    {
      title: 'Tác vụ',
      key: 'action',
      width: 160,
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Chi tiết">
            <Link to={`/missions/${record.id}`} className={styles.link}>
              <SvgIcons name="detail" />
            </Link>
          </Tooltip>

          <Tooltip title="Sửa">
            <Link to={`/missions/${record.id}`} className={styles.link}>
              <SvgIcons name="edit" onClick={handleEdit} />
            </Link>
          </Tooltip>

          <Tooltip title="Xóa">
            <Popconfirm
              title={`Xóa nhiệm vụ: ${record.name}`}
              onConfirm={(e) => confirm(e, record)}
              onCancel={cancel}
              okText="Xóa"
              cancelText="Hủy"
              placement="topRight"
            >
              <Link to="" className={styles.link}>
                {<SvgIcons name="delete" />}
              </Link>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const onShowSizeChange = (current: number, pageSize: number) => {
    setPageIndex(current);
    setPageSize(pageSize);
  };

  const onChange = (page: number) => {
    setPageIndex(page);
  };

  const itemRender = (current: any, type: any, originalElement: any) => {
    if (type === 'prev') {
      return <span className="pagination-button">Sau</span>;
    }
    if (type === 'next') {
      return <span className="pagination-button">Tiếp</span>;
    }
    return originalElement;
  };

  const handleSearchMissions = (name: string, communication: string) => {
    let url = `${process.env.REACT_APP_API_URL}/missions/search?name=${name}&communication=${communication}`;
    if (communication === 'All') {
      url = `${process.env.REACT_APP_API_URL}/missions/search?name=${name}`;
    }

    customAxios
      .get(url)
      .then((res) => {
        setMissions(res.data.missionResponseList);
        setTotalItems(res.data.totalItems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllMissions(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return (
    <LayoutHome>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quản lý nhiệm vụ</title>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <MissionsHeaderContainer
            handleSearchMissions={handleSearchMissions}
          />
        </div>

        {isLoading ? (
          <Spin
            size="large"
            style={{ margin: '40px auto', display: 'block' }}
          />
        ) : (
          <div className={styles.content}>
            <Table<any>
              columns={columns}
              dataSource={missions}
              rowKey="missionKey"
              scroll={{ x: 1300 }}
              loading={false}
              pagination={false}
              className={`${styles['ant-table-wrapper']}`}
            />
            <Pagination
              defaultCurrent={pageIndex}
              total={totalItems}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              itemRender={itemRender}
              className={styles.pagination}
              pageSizeOptions={['10', '15', '20']}
            />
          </div>
        )}
      </div>
    </LayoutHome>
  );
}
