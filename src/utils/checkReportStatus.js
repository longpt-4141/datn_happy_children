export const checkReportStatus = (reports) => {
    if(reports.length === 0) {
        return  {
            status : 2,
        };
    } else {
        let check = reports.find((item) => item.status === 0) 
        console.log({check})
        if(check) {
            return {
                status : 0,
                id : check.id
            } // đang có báo cáo chờ duyệt 
        } else {
            let checkAccpet = reports.find((item) => item.status === 1) 
            console.log({checkAccpet})
            if(checkAccpet) {
                return  {
                    status : 1,
                    id : checkAccpet.id
                } // đã được duyệt rồi
            }
            else {
                return {
                    status : 2,
                };// chưa có báo cáo nào hoặc đã bị từ chối
            }
        }
    }
}