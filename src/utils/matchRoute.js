export const getLastEstLocationKey = (menuItem, location) => {
    if (location.pathname === '/') {
        return menuItem[0].key;
    } else {    
        let currentLocation = menuItem.filter((item) => {
        if (item.children) {
            return item.children.some((child) => {
                return location.pathname.includes(child.route)
            })
        } else {
            return location.pathname.includes(item.route)
        }
    })
    if(currentLocation[0].children) {
        const newCurrentLocation = currentLocation[0].children.filter(child => location.pathname.includes(child.route))
        return newCurrentLocation[0].key
    } else return currentLocation[0].key;
}
}