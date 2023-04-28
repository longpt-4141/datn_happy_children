import React from 'react';
import RequestList from './requests-list/RequestList';
import { Button, Row, Input, Col} from 'antd';
import { useState } from 'react';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  selectCurrentToken,  selectUserRole } from '../../services/slicer/AuthSlicer';
const RequestPage = () => {
    const [searchText, setSearchText] = useState('');
    const [hiddenColumn, setHiddenColumn] = useState(false)

    const navigate = useNavigate('');
    const token = useSelector(selectCurrentToken);
    const currentRole = useSelector(selectUserRole);
    console.log('>>> token',{token});
    // const dispatch = useDispatch();
    const onSearch = (e) => {
        const searchTextAfterConvert = removeVietnameseTones(e.target.value).toLowerCase();
        setSearchText(searchTextAfterConvert)
    }

    const handleAddRequest = (e) => {
        e.preventDefault();
        navigate('/requests/add')
    }

    useEffect(() => {
        if(currentRole === 1) {
            setHiddenColumn(false)
        }else if(currentRole === 2) {
            setHiddenColumn(true)
        }
    },[]);

    return (
        <div className='center-page'>
            <div className="center--list__filter">
                <Row>
                    <Col span={6} offset={6}>
                        <Input
                            onChange={onSearch}
                            type='search'
                            placeholder="Search product"
                        />
                    </Col>
                    <Col span={6} offset={6}>
                        <Button 
                            className='button__add--request'
                            onClick={handleAddRequest}
                        >
                            Thêm mới yêu cầu
                        </Button>
                    </Col>
                </Row>
            </div>
            <RequestList searchText={searchText} hiddenColumn={hiddenColumn} />
        </div>
    );
}

export default RequestPage ;
