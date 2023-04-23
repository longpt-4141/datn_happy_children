import React, { useContext } from 'react'
import './navbar.scss';
import { useNavigate} from 'react-router-dom';
import { Layout , Button, Row, Col,  Dropdown, Space} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { UserContext } from '../../context/UserProvider';
import { useDispatch } from 'react-redux';
import RequestSlice from '../../services/slicer/RequestSlicer';

const { Header} = Layout;
const Navbar = () => {
  const navigate = useNavigate()
  const {logout} = useContext(UserContext)
  const dispatch = useDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(RequestSlice.actions.testCheck())
    // navigate('/login')
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

  return (
    <Header style={{
      paddingInline : '15px'
    }}>
      <Row>
        <Col span={18}>
          <div></div>
        </Col>
        <Col span={6}>
          <div className="header--information">
            <Row>
              <Col span={6} className="header--notification"></Col>
              <Col span={18} className='header--user'>
                <Row>
                  <Col span={8} className='user--avatar'></Col>
                  <Col span={16} className='user--name'>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={['click']}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <Space>
                        Click me
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;

