const getCookie = function () {
    if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
                // this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                return true;
            }
        }
        return false;
    }
}
const clearCookie = function () {
    this.setCookie("", -1);
}
const setCookie = function (c_name, exdays) {
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
}
export default {
    getCookie, clearCookie, setCookie
}
