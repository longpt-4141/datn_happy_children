export default function convertVNDMoney(money) {
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
    const formatted = new Intl.NumberFormat('vi-VN', config).format(money);
    return formatted;
}