const checkLogin = (req, res, next) => {
    console.log('================================================================');
    console.log('START_CHECK_AUTHENTICATION');
    console.log({res: res.cookie});
    console.log('END_CHECK_AUTHENTICATION');
    console.log('================================================================');
    next();
}


module.exports = {
    checkLogin: checkLogin
}