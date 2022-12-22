class Helper {
    static formatCurrency(number) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: "vnd"})
        .format(Number(number));
    }
}
export default Helper;