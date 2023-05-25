import React from 'react'
import './navbar.scss';
import { Link, useNavigate} from 'react-router-dom';
import { Layout , Button, Row, Col,  Dropdown, Space, Badge, Popover, List, Skeleton, Avatar, Divider, message} from 'antd';
import { DownOutlined,NotificationOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import AuthSlice, { selectCurrentUser, selectUserRole } from '../../services/slicer/AuthSlicer';
import UserAvatar from '../upload-image/UserAvatar'
import { IoNotifications, IoTimeOutline } from 'react-icons/io5';
import socketClient  from "socket.io-client";
import { useEffect,useState } from 'react';
import { getAllNotifications, selectAdminNotifications, selectCountNotifications } from '../../services/slicer/NotificationSlicer';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationsContent from '../notification/NotificationsContent';
import { formatRequestCreate } from '../../utils/format/date-format';
import axios from 'axios';
import { getAllNotificationsService, updateReadNotification } from '../../services/notificationService';
import { toastWaiting } from '../../utils/toast-popup';

const { Header} = Layout;
const count = 3;
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const currentRole = useSelector(selectUserRole)
  const currentUser = useSelector(selectCurrentUser)
  const countNotifications = useSelector(selectCountNotifications);
  const adminNotifications = useSelector(selectAdminNotifications)
  const SERVER = "http://127.0.0.1:8080";
  var socket = socketClient (SERVER);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [countNoti, setCountNoti] = useState(0);
  const [countActiveNoti, setCountActiveNoti] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const loadMoreData = async () => {
    let countLoad = 1
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      // await dispatch(getAllNotifications({currentRole, offset})).unwrap()
      let res = await getAllNotificationsService(currentRole, offset);
      res = {
        ...res,
        rows : res.rows.map((item) => ({
            ...item,
            data : JSON.parse(item.data)
        }))
      }
      setCountNoti(res.count)
      setData([...data, ...res.rows]);
      /* count active noti */
      let activeNotiArray = [...data, ...res.rows].filter((item) => {
        return item.read_at === null
      })
      setCountActiveNoti(activeNotiArray.length)
      /*  */
      countLoad++;
      console.log({countLoad})
      setOffset(offset + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(AuthSlice.actions.logOut())
    navigate('/login')
  } 

  const items = [
    {
      label: <p>
        <Button onClick={handleLogout}> Logout</Button>
      </p>,
      key: '0',
    },
    {
      label: <p>2nd menu item</p>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

  const handleClickNotification = async (readAt,notiId) => {
    console.log('bam', notiId)
    if (readAt === null) {
      setLoading(true);
      try {
        let res = await updateReadNotification(currentRole,notiId)
        res = {
          ...res,
          data : JSON.parse(res.data)
        }
        let newData = [];
        data.forEach((item) => {
          if(item.id === res.id) {
            newData.push(res);
          }
          else {
            newData.push(item);
          }
        })
        console.log({newData})
        /* count active noti */
        let activeNotiArray = newData.filter((item) => {
          return item.read_at === null
        })
        setCountActiveNoti(activeNotiArray.length)
      /*  */
        setData(newData)
        setLoading(false);
      } catch (error) {
        console.log('read error', error)
        setLoading(false);
      }
    }
  }

  console.log({data})

  useEffect(() => {
    loadMoreData();
  }, [dispatch]);

  useEffect(() => {
    if (currentRole === 1) {
      socket.on('notification', async noti => {
          toastWaiting('Có thông báo mới kìaaa')
        console.log('>>>>>>>>>>>>>>>>>>fhlbfuqfwqfe', noti)
        let res = await getAllNotificationsService(currentRole, offset);
        res = {
          ...res,
          rows : res.rows.map((item) => ({
              ...item,
              data : JSON.parse(item.data)
          }))
        }
        setData([...data, ...res.rows]);
        /* count active noti */
          let activeNotiArray = [...data, ...res.rows].filter((item) => {
            return item.read_at === null
          })
          setCountActiveNoti(activeNotiArray.length)
        /*  */
        setCountNoti(res.count)
      });
    }
    if (currentRole ===2) {
      socket.on('center notification', async noti => {
        toastWaiting('Có thông báo mới kìaaa')
        console.log('>>>>>>>>>>>>>>>>>>center get noti', noti)
      let res = await getAllNotificationsService(currentRole, offset);
      res = {
        ...res,
        rows : res.rows.map((item) => ({
            ...item,
            data : JSON.parse(item.data)
        }))
      }
      setData([...data, ...res.rows]);
      /* count active noti */
        let activeNotiArray = [...data, ...res.rows].filter((item) => {
          return item.read_at === null
        })
        setCountActiveNoti(activeNotiArray.length)
      /*  */
      setCountNoti(res.count)
    });
    }
  },[])
  const title = (
    <>
      <h3>
        Thông báo
      </h3>
    </>
  )

    console.log({offset})

  const content = (
    <div className="notification__body">
        <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < countNoti}
        loader={
          <Skeleton
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
      {
        currentRole === 1 ? 
        <List
          dataSource={data}
          renderItem={(item) => (
            // <NotificationsContent data={item}/>
              item.read_at === null ? 
                  <Link to={`/requests/${item.data.id}`} onClick={() => handleClickNotification(item.read_at,item.id)}>
                    <List.Item 
                      key={item.id}
                      className='notification--item'
                      >
                        <div
                          className='notification--item__inner'
                        >
                          <span>
                            <b>{item.center.name}</b> đã tạo yêu cầu mới, hãy bấm vào đế xem chi tiết yêu cầu
                          </span>
                          <p
                          className='noti-time'
                          >
                              <IoTimeOutline />
                              {formatRequestCreate(item.createdAt)}
                          </p>
                        </div>
                        <div
                          className='read__signal'
                        >
                        </div>
                    </List.Item>
                  </Link>
                    :
                    <Link to={`/requests/${item.data.id}`} onClick={() => handleClickNotification(item.read_at,item.id)}>
                    <List.Item 
                      key={item.id}
                      className='notification--item__read'
                      >
                        <div
                          className='notification--item__inner'
                        >
                          <span>
                            <b>{item.center.name}</b> đã tạo yêu cầu mới, hãy bấm vào đế xem chi tiết yêu cầu
                          </span>
                          <p
                          className='noti-time'
                          >
                              <IoTimeOutline />
                              {formatRequestCreate(item.createdAt)}
                          </p>
                        </div>
                    </List.Item>
                  </Link>
          )}
        /> :
        currentRole === 2 ? 
        <List
          dataSource={data}
          renderItem={(item) => (
            // <NotificationsContent data={item}/>
                  <Link to={`/requests/${item.data.id}`} onClick={() => handleClickNotification(item.read_at,item.id)}>
                    <List.Item 
                      key={item.id}
                      className={item.read_at === null ? 'notification--item' : "notification--item__read" }
                      >
                        <div
                          className='notification--item__inner'
                        >
                          {
                            item.type === 'request/accepted' ?
                            <span>
                              Yêu cầu của bạn đã được duyệt, Hãy bấm vào để xem và xác nhận nhận tiền
                            </span>
                            : item.type === 'request/rejected' ?
                            <span>
                              Yêu cầu của bạn đã bị <b>từ chối</b>, Hãy bấm vào để xem và xác nhận nhận tiền
                            </span>
                            :
                          <></>
                          }
                          <p
                          className='noti-time'
                          >
                              <IoTimeOutline />
                              {formatRequestCreate(item.createdAt)}
                          </p>
                        </div>
                        <div
                          className='read__signal'
                        >
                        </div>
                    </List.Item>
                  </Link>
          )}
        />
        :
        <></>
      }
      </InfiniteScroll>
    </div>
    </div>
  )

  return (
    <Header style={{
      paddingInline : '15px'
    }}>
      <Row>
        <Col span={12}>
          <div></div>
        </Col>
        <Col span={12}>
          <div className="header--information">
            <Row
              style={{
                justifyContent: "flex-end",
              }}
            >
              <div className="header--notification">
                <Popover placement="bottom" title={title} content={content} trigger="click" style={{
                  width : '380px',
                }}
                className="notification--popover"
                >
                  <Button>
                      <Badge count={countActiveNoti} size="small">
                        <NotificationOutlined
                          style={{
                            fontSize: 16,
                          }}
                        />
                      </Badge>
                  </Button>
                </Popover>
              </div>
              <div className='header--user'>
                <div className='user--name'>
                      <p
                        style={{
                          fontWeight: '500'
                        }}
                      >
                        {currentUser.username ? currentUser.username : ''} 
                      </p
                      >
                      <p
                      style={{
                          fontSize: '12px'
                        }}
                      >
                      {
                        currentRole === 1 ? 
                        <p>Quản trị viên</p>
                        :
                        currentRole === 2 ?
                        <p>Đại diện trung tâm</p>
                        :
                        <></>
                      }
                      </p>
                  </div>
                  <div span={8} className='user--avatar'>
                    <UserAvatar avatar={currentUser.avatar} avatarSize={40}/>
                  </div>
                  <div span={2}>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={['click']}
                    >
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <Space>
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;

