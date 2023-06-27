import { SolutionOutlined, TeamOutlined, HomeOutlined, PushpinOutlined, FileOutlined } from '@ant-design/icons'
import type { FC } from 'react'

interface CustomIconProps {
  type: string
}

export const CustomIcon: FC<CustomIconProps> = (props) => {
  const { type } = props
  let com = <FileOutlined />

  if (type === 'userlist') {
    com = <TeamOutlined />
  } else if (type === 'userprofile') {
    com = <SolutionOutlined />
  } else if (type === 'stafflist') {
    com = <TeamOutlined />
  } else if (type === 'staffprofile') {
    com = <SolutionOutlined />
  } else if (type === 'home') {
    com = <HomeOutlined />
  } else if (type === 'about') {
    com = <PushpinOutlined />
  } else {
    return com
  }

  return <span className='anticon'>{com}</span>
}
