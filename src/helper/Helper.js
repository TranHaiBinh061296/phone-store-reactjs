class Helper {
    static formatCurrency(number) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: "vnd"})
        .format(Number(number));
    }
    static getFileName(fileUrl) {
        return fileUrl.split("/").pop().split('.')[0];
    }
}
export default Helper;