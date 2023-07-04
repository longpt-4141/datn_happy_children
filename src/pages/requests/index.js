import React from 'react';
import RequestList from './requests-list/RequestList';
import { Button, Row, Input, Col, Select, Statistic, Card} from 'antd';
import { useState } from 'react';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  selectCenterId, selectCurrentToken,  selectUserRole } from '../../services/slicer/AuthSlicer';
import { TbPencilPlus } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import './index.scss'
import { REQUEST_STATUS, REQUEST_TYPE } from '../../constants/requests';
import RequestTypeTag from '../../components/tags/RequestTypeTag';
import StatusTag from '../../components/tags/StatusTag';
import RequestSlice from '../../services/slicer/RequestSlicer';
import CountUp from 'react-countup';
import useSWR from 'swr';
import { fetchAllMoney } from '../../services/statisticService';

export const useNormalMoney = () => {
    const { data, error, isLoading } = useSWR(
        `/transaction/get-all-normal-money`,
        fetchAllMoney,
    );

    return {
        normalMoneyData: data,
        isNormalMoneyLoading: isLoading,
        isNormalMoneyError: error,
    };
}

const RequestPage = () => {
    const {Option} = Select
    // const [searchText, setSearchText] = useState('');
    const [hiddenColumn, setHiddenColumn] = useState(false)
    const [filterData, setFilterData] = useState({
        searchText: '',
        requestType : null,
        requestStatus : null
    })
    
    const {normalMoneyData, isNormalMoneyLoading} = useNormalMoney()

    const formatter = (value) => <CountUp end={value} separator="," suffix=" vnđ" style={{
        color : 'var(--mainColor)',
        fontWeight : 500,
        fontSize : '26px',
        letterSpacing : '1.25'
    }}/>;

    const navigate = useNavigate('');
    const token = useSelector(selectCurrentToken);
    const currentRole = useSelector(selectUserRole);
    let centerId = useSelector(selectCenterId)
    console.log('>>> token',{token});
    const dispatch = useDispatch();
    const onSearch = (e) => {
        const searchTextAfterConvert = removeVietnameseTones(e.target.value).toLowerCase();
        setFilterData({
            ...filterData,
            searchText : searchTextAfterConvert
        })
    }

    const handleAddRequest = (e) => {
        e.preventDefault();
        navigate('/requests/add')
    }

    const handleSelectRequestType = (value) => {
        console.log('handleSelectRequestType',value)
        setFilterData({
            ...filterData,
            requestType : value
        })
        // dispatch(RequestSlice.actions.filterByRequestType(value))
    }

    const handleSelectRequestStatus =  (value) => {
        console.log('handleSelectRequestStatus',value)
        setFilterData({
            ...filterData,
            requestStatus: value
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
        dispatch(RequestSlice.actions.filterByStatus(filterData))
    },[dispatch, filterData]);

    return (
        <div className='center-page'>
            <div className="center--list__filter">
                <h3
                    style={{
                        color : 'var(--mainColor)',
                        fontSize : '20px',
                        fontWeight: '500',
                        marginBottom: '40px',
                    }}
                    
                >
                    Danh sách yêu cầu
                </h3>
                {
                    isNormalMoneyLoading ? 
                    <>
                        Load
                    </>
                    :
                    <Card bordered={false} style={{
                        marginBottom : '20px',
                        background: 'var(--subPinkCOlor)'
                    }}>
                        <Statistic 
                            title={<p>Tổng tiền quỹ chung</p>} 
                            value={normalMoneyData} 
                            formatter={formatter} 
                        />
                    </Card>
                }
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
                            placeholder="Loại yêu cầu" 
                            style={{
                                width: '100%'
                            }}
                            onChange={handleSelectRequestType}
                        >
                            {
                                REQUEST_TYPE.map((type) => (
                                    <Option value={type.value}>
                                        <RequestTypeTag value={type.value}/>
                                    </Option>
                                ))
                            }
                        </Select>
                    </Col>

                    <Col span={4}>
                        <Select 
                            allowClear
                            placeholder="Trạng thái" 
                            style={{
                                width: '100%'
                            }}
                            onChange={handleSelectRequestStatus}
                        >
                            {
                                REQUEST_STATUS.map((type) => (
                                    <Option value={type.value}>
                                        <StatusTag value={type.value}/>
                                    </Option>
                                ))
                            }
                            <Option value={4}> {/* đã nhận tiền */}
                                <div
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <StatusTag 
                                    style={{
                                        marginTop: '6px'
                                    }}
                                    value={1} confirm_money_status={1}/>
                                </div>
                            </Option>
                        </Select>
                    </Col>

                    {
                        currentRole === 2 ? 
                        <Col 
                            span={4} 
                            offset={
                                10
                            }
                        >
                            <Button 
                                className='button__add--request'
                                type='primary'
                                icon={<TbPencilPlus/>}
                                onClick={handleAddRequest}
                            >
                                Thêm mới yêu cầu
                            </Button>
                        </Col>
                        :
                        <></>
                    }
                </Row>
            </div>
            <RequestList hiddenColumn={hiddenColumn} currentRole={currentRole} centerId={centerId}/>
        </div>
    );
}

export default RequestPage ;
