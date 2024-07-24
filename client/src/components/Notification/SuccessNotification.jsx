import React from 'react'
import { SmileTwoTone } from '@ant-design/icons'
import { notification } from 'antd'

const SuccessNotification = ({ message, description }) => {
  notification.open({
    message: message,
    description: description,
    icon: React.createElement(SmileTwoTone, { twoToneColor: '#096dd9' })
  })

  return null
}

export default SuccessNotification
