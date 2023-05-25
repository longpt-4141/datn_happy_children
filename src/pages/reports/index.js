import React from 'react';
import { Button, Row, Input, Col, Select} from 'antd';
import { useState } from 'react';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  selectCenterId, selectCurrentToken,  selectUserRole } from '../../services/slicer/AuthSlicer';
import { TbReportMoney } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import './index.scss'
import ListReport from './reports-list/ListReport';
import { REPORT_STATUS } from '../../constants/reports';
import ReportStatusTag from '../../components/tags/ReportStatusTag';
import ReportSlice from '../../services/slicer/ReportSlicer';
const ReportPage = () => {
    const {Option} = Select
    // const [searchText, setSearchText] = useState('');
    const [hiddenColumn, setHiddenColumn] = useState(false)
    const [filterData, setFilterData] = useState({
        searchText: null,
        reportStatus : null
    })

    const navigate = useNavigate('');
    const token = useSelector(selectCurrentToken);
    const currentRole = useSelector(selectUserRole);
    let centerId = useSelector(selectCenterId)
    console.log('>>> token',{token});
    console.log('>>> token',{currentRole});
    console.log('>>> token',{centerId});
    const dispatch = useDispatch();
    const onSearch = (e) => {
        const searchTextAfterConvert = removeVietnameseTones(e.target.value).toLowerCase();
        setFilterData({
            ...filterData,
            searchText : searchTextAfterConvert
        })
    }

    const handleAddReport = (e) => {
        e.preventDefault();
        navigate('/requests')
    }


    const handleSelectReportStatus =  (value) => {
        console.log('handleSelectReporttStatus',value)
        setFilterData({
            ...filterData,
            reportStatus: value
        })
    }

    console.log({filterData})

    useEffect(() => {
        if(currentRole === 1) {
            setHiddenColumn(false)
        }else if(currentRole === 2) {
            setHiddenColumn(true)
        }
    },[]);

    useEffect(() => {
        dispatch(ReportSlice.actions.filterByStatus(filterData))
    },[dispatch, filterData]);

    return (
        <div className='report-page'>
            <div className="report--list__filter">
                <h3
                    style={{
                        color : 'var(--mainColor)',
                        fontSize : '20px',
                        fontWeight: '500',
                        marginBottom: '40px',
                    }}
                    
                >
                    Danh sách báo cáo
                </h3>
                <Row
                    style={
                            currentRole === 2 ? {justifyContent : 'space-evenly'} : {gap : '10px'}
                        }
                >
                    <Col span={1}
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        <VscListFilter
                            style={{
                                fontSize: '22px',
                                color: 'var(--mainColor)'
                            }}
                        />
                    </Col>
                    {
                        currentRole === 1 ? 
                        <Col span={5}>
                            <Input
                                allowClear
                                onChange={onSearch}
                                type='search'
                                placeholder="Tìm kiếm theo tên trung tâm"
                            />
                        </Col>
                        :
                        <></>
                    }

                    <Col span={4}>
                        <Select 
                            allowClear
                            placeholder="Trạng thái" 
                            style={{
                                width: '100%'
                            }}
                            onChange={handleSelectReportStatus}
                        >
                            {
                                REPORT_STATUS.map((type) => (
                                    <Option value={type.value}>
                                        <ReportStatusTag value={type.value}/>
                                    </Option>
                                ))
                            }
                            
                        </Select>
                    </Col>
                    {
                        currentRole === 2 ? 
                        <Col 
                            span={8} 
                            offset={
                                6
                            }
                        >
                            <Button 
                                className='button__add--report'
                                type='primary'
                                icon={<TbReportMoney/>}
                                onClick={handleAddReport}
                            >
                                Đi tới trang yêu cầu để thêm mới báo cáo 
                            </Button>
                        </Col>
                        :
                        <></>
                    }
                </Row>
            </div>
            <ListReport hiddenColumn={hiddenColumn} currentRole={currentRole} centerId={centerId} filterData={filterData}/>
        </div>
    );
}

export default ReportPage ;
