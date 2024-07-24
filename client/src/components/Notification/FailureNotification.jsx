import React from 'react'
import { AlertTwoTone } from '@ant-design/icons'
import { notification } from 'antd'

const FailureNotification = ({ message, description }) => {
  notification.open({
    message: message,
    description: description,
    icon: React.createElement(AlertTwoTone, { twoToneColor: '#cf1322' })
  })

  return null
}

export default FailureNotification
