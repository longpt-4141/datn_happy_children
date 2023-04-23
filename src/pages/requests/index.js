import React from 'react';
import RequestList from './requests-list/RequestList';
import { Button, Row, Input, Col} from 'antd';
import { useState } from 'react';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { useNavigate } from 'react-router-dom';
const RequestPage = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate('')
    const onSearch = (e) => {
        const searchTextAfterConvert = removeVietnameseTones(e.target.value).toLowerCase();
        setSearchText(searchTextAfterConvert)
    }

    const handleAddRequest = (e) => {
        e.preventDefault();
        navigate('/requests/add')
    }

    return (
        <div className='center-page'>
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
            <RequestList searchText={searchText}/>
        </div>
    );
}

export default RequestPage ;
