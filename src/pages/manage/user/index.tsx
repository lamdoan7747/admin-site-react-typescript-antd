import { Button, Col, Input, Modal, Row, Space, Table, Tag } from 'antd'
import './index.less'

import { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import AddUserDrawer from '../dialog'
import dayjs from 'dayjs'

export interface User {
  key: string
  name: string
  gender: string
  roles: string[]
  email: string
  contact: string
  address: string
  employeeTypes: string[]
  lastLogin: string
  dob: Date
}

const data: User[] = [
  {
    key: '1',
    name: 'John Brown',
    gender: 'Male',
    roles: ['product', 'developer'],
    email: 'abc@gmail.com',
    contact: '0123456789',
    address: 'New York No. 1 Lake Park',
    employeeTypes: ['junior', 'middle'],
    lastLogin: 'Last 1 minutes',
    dob: new Date()
  },
  {
    key: '2',
    name: 'John Doe',
    gender: 'Female',
    roles: ['product'],
    email: 'abcdef@gmail.com',
    contact: '0123456788',
    address: 'Santiago No. 1 Lake Park',
    employeeTypes: ['junior', 'middle'],
    lastLogin: 'Last 10 minutes',
    dob: new Date()
  },
  {
    key: '3',
    name: 'John Son',
    gender: 'Male',
    roles: ['developer'],
    email: 'abcdefghi@gmail.com',
    contact: '0123456787',
    address: 'California No. 1 Lake Park',
    employeeTypes: ['junior', 'middle'],
    lastLogin: 'Last 1 hours',
    dob: new Date()
  }
]

const UserListPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)
  // State for the user being edited
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [userList, setUserList] = useState<User[]>(data)
  const [filteredUserList, setFilteredUserList] = useState<User[]>([])
  const [deleteUserKey, setDeleteUserKey] = useState<string | null>(null)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleSearchChange = (e: any) => {
    setSearchKeyword(e.target.value)
  }

  const onCloseModal = () => {
    setEditingUser(undefined)
    setIsOpenModal(false)
  }

  const hideDeleteModal = () => {
    setDeleteUserKey(null)
    setIsDeleteModalVisible(false)
  }

  // Function to handle edit button click
  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsOpenModal(true)
  }

  const handleDelete = (userKey: string) => {
    setDeleteUserKey(userKey)
    setIsDeleteModalVisible(true)
  }

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            const color = role.length > 5 ? 'geekblue' : 'green'
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob) => dayjs(dob).format('DD/MM/YYYY')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Mobile',
      dataIndex: 'contact',
      key: 'contact'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Employee Type',
      dataIndex: 'employeetype',
      key: 'employeetype',
      render: (_, { employeeTypes }) => (
        <>
          {employeeTypes.map((employee) => {
            const color = employee.length > 5 ? 'geekblue' : 'green'
            return (
              <Tag color={color} key={employee}>
                {employee.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      )
    }
  ]

  const handleAddUser = (user: User) => {
    const newUser = { ...user, key: `${userList.length + 1}` }
    setUserList((prevUserList) => [...prevUserList, newUser])
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUserList((prevUserList) => {
      const updatedList = prevUserList.map((user) => {
        if (user.key === updatedUser.key) {
          return updatedUser
        }
        return user
      })
      return updatedList
    })
  }

  const handleDeleteUser = (userKey: string | null) => {
    setUserList((prevUserList) => {
      const updatedList = prevUserList.filter((user) => user.key !== userKey)
      return updatedList
    })
  }

  const handleSearch = () => {
    const filteredList = userList.filter((user) => user.name.toLowerCase().includes(searchKeyword.toLowerCase()))
    setFilteredUserList(filteredList)
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClearSearch = () => {
    setSearchKeyword('')
    setFilteredUserList([])
  }

  return (
    <div className='layout-internal'>
      <Row gutter={12} className='mb-8'>
        <Col span={4}>
          <Input
            placeholder='Search user'
            value={searchKeyword}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </Col>
        <Col span={4}>
          <Button onClick={handleClearSearch}>Clear</Button>
        </Col>
        <Col span={12} offset={4} className='text-right'>
          <Button onClick={() => setIsOpenModal(true)} type='primary'>
            Add User
          </Button>
        </Col>
      </Row>
      <Row className='mb-8'>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={filteredUserList.length > 0 ? filteredUserList : userList}
            rowKey={(record) => record.key}
          />
        </Col>
      </Row>
      <AddUserDrawer
        user={editingUser}
        visible={isOpenModal}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        onClose={onCloseModal}
      />

      <Modal
        title='Confirm Delete'
        open={isDeleteModalVisible}
        onOk={() => {
          handleDeleteUser(deleteUserKey)
          hideDeleteModal()
        }}
        onCancel={hideDeleteModal}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  )
}

export default UserListPage
