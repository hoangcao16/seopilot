import { SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import ButtonComponent from 'components/ButtonComponent';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export interface MissionsHeaderContainerProps {
  handleSearchMissions: Function;
}

export default function MissionsHeaderContainer(
  props: MissionsHeaderContainerProps
) {
  const { handleSearchMissions } = props;

  const communicationData = ['Google', 'Youtube', 'Tất cả'];
  const { Option } = Select;

  const [name, setName] = useState('');
  const [communication, setCommunication] = useState('');

  const selectCommunication = (value: any) => {
    if (value === 'Tất cả') {
      setCommunication('All');
      handleSearchMissions(name, 'All');
    } else {
      setCommunication(value);
      handleSearchMissions(name, value);
    }
  };

  const handlePressEnter = () => {
    handleSearchMissions(name, communication);
  };

  return (
    <div className={styles.wrapper}>
      <Select
        placeholder="Chọn nền tảng"
        onChange={selectCommunication}
        className={styles.select}
        defaultValue="Tất cả"
      >
        {communicationData.map((item: string) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>

      <Input
        placeholder="Tìm nhiệm vụ"
        className={`${styles['ant-input-affix-wrapper']}`}
        prefix={<SearchOutlined />}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={handlePressEnter}
      />

      {/* <Button className={`${styles['ant-button']}`}>
        <Link to="/missions/add">Thêm mới</Link>
      </Button> */}

      <ButtonComponent
        height={48}
        width={166}
        type="outlineBlue"
        borderRadius={4}
      >
        <Link to="/missions/add">Thêm mới</Link>
      </ButtonComponent>
    </div>
  );
}
