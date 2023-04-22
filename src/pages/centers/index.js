import React from 'react';
import CentersList from './list-centers/ListCenters';
import { Button, Row, Input, Col} from 'antd';
import { useState } from 'react';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { useNavigate } from 'react-router-dom';
const Centers = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate('')
    const onSearch = (e) => {
        const searchTextAfterConvert = removeVietnameseTones(e.target.value).toLowerCase();
        setSearchText(searchTextAfterConvert)
    }

    const handleAddCenter = (e) => {
        e.preventDefault();
        navigate('/centers/add')
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
                        className='button__add--center'
                        onClick={handleAddCenter}
                    >
                        Thêm mới trung tâm
                    </Button>
                </Col>
            </Row>
            <CentersList searchText={searchText}/>
        </div>
    );
}

export default Centers;
