import React, { useEffect, useState } from 'react'
import { Drawer, Form, Button, Input, Select, DatePicker } from 'antd'
import { User } from '../user'
import dayjs from 'dayjs'

const { Option } = Select

interface AddUserDrawerProps {
  visible: boolean
  onClose: () => void
  onAddUser: (user: User) => void
  onUpdateUser: (user: User) => void
  user?: User
}

const AddUserDrawer: React.FC<AddUserDrawerProps> = ({ visible, user, onClose, onAddUser, onUpdateUser }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        dob: dayjs(user.dob) // Chuyển đổi giá trị ngày thành đối tượng dayjs
      })
    }
  }, [user, form])

  const onFinish = (user: User) => {
    setLoading(true)
    setTimeout(() => {
      if (user) {
        console.log('Update user')
        onUpdateUser(user)
      } else {
        console.log('Add user')
        onAddUser(user)
      }
      setLoading(false)
      form.resetFields()
      onClose()
    }, 2000)
  }

  return (
    <Drawer title='Add User' placement='right' closable={false} open={visible} onClose={onClose} width={400}>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Form.Item label='ID' name='key' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please enter name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please enter email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Contact' name='contact' rules={[{ required: true, message: 'Please enter contact' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Gender' name='gender' rules={[{ required: true, message: 'Please select gender' }]}>
          <Select>
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Date of Birth'
          name='dob'
          rules={[{ required: true, message: 'Please select date of birth' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label='Employee Types'
          name='employeeTypes'
          rules={[{ required: true, message: 'Please select employee types' }]}
        >
          <Select mode='multiple'>
            <Option value='manager'>Manager</Option>
            <Option value='engineer'>Engineer</Option>
            <Option value='designer'>Designer</Option>
          </Select>
        </Form.Item>
        <Form.Item label='Roles' name='roles' rules={[{ required: true, message: 'Please select employee types' }]}>
          <Select mode='multiple'>
            <Option value='junior'>Junior</Option>
            <Option value='middle'>Middle</Option>
          </Select>
        </Form.Item>
        <Form.Item label='Address' name='address' rules={[{ required: true, message: 'Please enter address' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default AddUserDrawer
