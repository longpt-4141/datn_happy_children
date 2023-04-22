import data from '../constants/province-city.json'

// let parsedData = JSON.parse(data)

Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate));

// var filtered = Object.filter(data, ([name, score]) => name === "John"); 

const getProvinceData = () => {
    let provinceData = [];
    data.forEach((item) => {
        let newObj = {}
        newObj['name'] = item.name;
        newObj['name_code'] = item.codename;
        provinceData.push(newObj);
    })
    return provinceData;
}

const getDistrictData = () => {
    let districtData = [];
    data.forEach((item) => {
        let newObj = {}
        newObj['districts'] = item.districts;
        newObj['name_code'] = item.codename;
        districtData.push(newObj);
    })
    return districtData;
}

const getProvinceName = (code) => {
    const provinceData = getProvinceData()
    let provinceName ;
    provinceData.forEach(province => {
        if(province.name_code === code){
            provinceName =  province.name
        }
    })
    return provinceName;
}


export {
    getProvinceData,
    getDistrictData,
    getProvinceName
}