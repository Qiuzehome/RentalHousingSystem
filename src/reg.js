const price = function (price) {
    var myreg = /^[0-9]*$/;
    if (!myreg.test(price)) {
        this.is_price = false;
        return false;
    } else {
        this.is_price = true;
        return true;
    }
}
const phone = function (phone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    // this.$options.methods.reg(myreg, phone);
    if (phone != "") {
        if (!myreg.test(phone) && phone != "") {
            return false;
        } else {
            return true;
        }
    }
    else {
        return true;
    }
}
const email = function (email) {
    var myreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!myreg.test(email) && email != "") {
        return false;
    } else {
        return true;
    }
}
const user = function (user) {

}
const psw = function (psw) {
    var myreg = /^.{6,16}$/
    var length = psw.length
    if (!myreg.test(psw) && psw != "") {
        return false;
    } else {
        return true;
    }
}
const re_psw = function (psw, psw0) {
    if (psw != null && psw0 != null) {
        if (psw === psw0) {
            return true;
        } else {
            return false;
        }
    }
    else {
        return true;
    }

}
export default {
    price, phone, email, re_psw, psw
}