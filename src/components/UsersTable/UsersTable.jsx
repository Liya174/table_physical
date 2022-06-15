import { Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function UsersTable({data}) {  

  function sort(a, b) {
    return a - b;
  }

  const columns = [
    {
      title: 'Пользователь',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'ФИО',
      key: 'first_name',
      render: (data) => (
        data.profile_link ? 
          <a href={data.profile_link}>{`${data.first_name} ${data.last_name}`}</a> : 
          `${data.first_name} ${data.last_name}`
      ),
    },
    {
      title: 'Email',
      key: 'email',      
      render: (data) => <a href={`mailto:${data.email}`}>{data.email}</a>
    },
    {
      title: 'Оплачено',
      dataIndex: 'pay_status',
      key: 'payment_status',
      render: (isPaid) => isPaid ? <CheckOutlined style={{color: 'green'}} /> : <CloseOutlined style={{color: 'red'}} />
    },
  ];
  
  return (
    <Table dataSource={data} columns={columns} bordered/>
  );
}

export default UsersTable;