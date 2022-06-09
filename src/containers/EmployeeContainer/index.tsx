import { Spin } from 'antd';
import EmployeeHeader from 'components/EmployeeHeader';
import EmployeeTable from 'components/EmployeeTable';
import React, { useEffect, useState } from 'react';
import customAxios from 'services/ApiClient';
import { openNotification } from 'utils/openNotification';

const EmployeeContainer = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllEmployees = (valueSearch?: string) => {
    setLoading(true);
    let url = `${process.env.REACT_APP_API_URL}/employees?size=100`;

    if (valueSearch) {
      url = `${process.env.REACT_APP_API_URL}/employees?size=100&key=${valueSearch}`;
    }

    console.log('value search: ', valueSearch);
    customAxios.get(url).then((res) => {
      setEmployees(res.data.employeeList);
      setLoading(false);
    });
  };

  const deleteEmployeeById = (id: string) => {
    customAxios
      .delete(`${process.env.REACT_APP_API_URL}/employees/${id}`)
      .then((res) => {
        openNotification('success', 'Xóa thành công');
        getAllEmployees();
      })
      .catch((err) => {
        openNotification('error', 'Xóa thất bại');
      });
  };

  const handleSearch = (value: string) => {
    getAllEmployees(value);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div>
      <EmployeeHeader handleSearch={handleSearch} />
      {loading ? (
        <Spin size="large" style={{ margin: '40px auto', display: 'block' }} />
      ) : (
        <EmployeeTable
          employees={employees}
          deleteEmployeeById={deleteEmployeeById}
        />
      )}
    </div>
  );
};

export default EmployeeContainer;
