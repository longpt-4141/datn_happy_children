import { Button, Card } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CenterReminder({reminderData}) {
  const navigate = useNavigate()

  const handleReadReminder = (reminder) => {
    console.log({reminder})
    const requestData = JSON.parse(reminder.data)
    navigate(`requests/${requestData.id}`)
  }

  return (
    <div>
        {
          reminderData ? 
          reminderData.map((reminder) => (
            <Card
            key={reminder.id}
            size="small"
            title="Nhắc nhở"
            extra={<Button className='' onClick={() =>  handleReadReminder(reminder)}>Xem</Button>}
            style={{
                width: "90%",
                margin: 'auto',
                border: 'none'
            }}
            >
            <p>Bạn có 1 yêu cầu đã được xét duyệt, hãy kiểm tra và xác nhận chuyển tiền khi nhận được tiền nhé!</p>
            </Card>
          ))
          :
          <></>
        }
    </div>
  )
}

export default CenterReminder