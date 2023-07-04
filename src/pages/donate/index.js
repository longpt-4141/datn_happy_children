import { Tabs } from 'antd'
import React from 'react'
import { ListNormalDonate } from './donate-list/ListNormalDonate';
import './index.scss'
import { ListFundDonate } from './donate-list/ListFundDonate';
import { ListItemDonate } from './donate-list/ListItemDonate';
export const DonatePage = () => {
    const items = [
            {
                key: '1',
                label: <div className='text-[#EB6446] text-base'>Quỹ chung</div>,
                children: <ListNormalDonate />,
            },
            {
                key: '2',
                label: <div className='text-[#EB6446] text-base'>Quyên góp sự kiện</div>,
                children: <ListFundDonate />, 
            },
            {
                key: '3',
                label: <div className='text-[#EB6446] text-base'>Từ thiện hiện vật</div>,
                children: <ListItemDonate />, 
            },
      ];
  return (
    <div className='donate-page'>
            <div className="donate--list__filter">
                <h3
                    style={{
                        color : 'var(--mainColor)',
                        fontSize : '20px',
                        fontWeight: '500',
                        marginBottom: '40px',
                    }}
                    
                >
                    Danh sách từ thiện
                </h3>
                {/* <Row
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
                </Row> */}
            </div>
            <Tabs 
            className="donate-tabs"
            items={items}/>
            {/* <ListReport hiddenColumn={hiddenColumn} currentRole={currentRole} centerId={centerId} filterData={filterData}/> */}
    </div>
  )
}
