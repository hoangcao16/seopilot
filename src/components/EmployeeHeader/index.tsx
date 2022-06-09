import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.scss';

export interface EmployeeHeaderProps {
  handleSearch: Function;
}

const EmployeeHeader = (props: EmployeeHeaderProps) => {
  const { handleSearch } = props;
  const [valueSearch, setValueSearch] = useState('');

  const onChange = (e: any) => {
    setValueSearch(e.target.value);
  };

  const onEnterPress = () => {
    handleSearch(valueSearch);
  };

  // useEffect(() => {
  //   const time = setTimeout(() => {
  //     handleSearch(valueSearch);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(time);
  //   };
  // }, [valueSearch]);

  return (
    <div className={classes.wrapper}>
      <Input
        placeholder="Tìm nhân viên"
        className={`${classes['ant-input-affix-wrapper']}`}
        prefix={<SearchOutlined />}
        onChange={onChange}
        onPressEnter={onEnterPress}
      />

      <Button className={`${classes['ant-button']}`}>
        <Link to="/employees/add">Thêm mới</Link>
      </Button>
    </div>
  );
};

export default EmployeeHeader;
