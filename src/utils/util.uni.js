

export function ToastUtil(){
}

/**
 * 获取一个Toast实例
 * @return {ToastUtil}
 */
ToastUtil.get = function () {
    if(ToastUtil.instance){
        return ToastUtil.instance;
    }else{
        ToastUtil.instance = new ToastUtil();
        return ToastUtil.instance;
    }
}

/**
 * 显示一个没有icon的弹窗
 * @param {string} title - 提示信息
 * @param {boolean} mask - 是否显示mask
 * @param {number} duration - 提示时长
 * @return {Promise<unknown>}
 */
ToastUtil.prototype.info = function (title, mask = true, duration = 2000) {
    return new Promise((resolve, reject) => {
        uni.showToast({
            title,
            icon: "none",
            mask,
            duration,
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 显示一个loading弹窗
 * @param {string} title - 提示信息
 * @param {boolean} mask - 是否显示mask
 * @return {Promise<unknown>}
 */
ToastUtil.prototype.showLoading = function (title = '', mask = true) {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title,
            mask,
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 显示一个错误的提示
 * @param {any} title - 提示信息
 * @param {boolean} mask - 是否显示mask
 * @param {number} duration - 提示时长
 * @returns {Promise<unknown>}
 */
ToastUtil.prototype.showError = function (title = '', mask = true,duration = 2000) {
    let _title = null;
    if(typeof title === "string"){
        _title = title;
    }else{
        _title = "网络错误,请稍后重试";
    }
    return new Promise((resolve, reject) => {
        uni.showToast({
            title: _title,
            icon: "none",
            mask,
            duration,
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 隐藏一个loading弹窗
 * @return {Promise<unknown>}
 */
ToastUtil.prototype.hideLoading = function () {
    return new Promise((resolve, reject) => {
        uni.hideLoading({
            success: resolve,
            fail: reject
        })
    })
}


export function CacheUtil(){
}

/**
 *
 * @return {CacheUtil}
 */
CacheUtil.get = function () {
    if(CacheUtil.instance){
        return CacheUtil.instance;
    }else{
        CacheUtil.instance = new CacheUtil();
        return CacheUtil.instance;
    }
}

/**
 * 获取缓存
 * @param {string} key - 缓存键名
 * @return {Promise<unknown>}
 */
CacheUtil.prototype.getItem = function (key) {
    return new Promise((resolve, reject) => {
        uni.getStorage({
            key,
            success: result => {
                if(result.data){
                    resolve(result.data);
                }else{
                    resolve(result);
                }
            },
            fail: err => resolve(null)
        });
    })
}
/**
 * 设置缓存
 * @param {string} key - 缓存键名
 * @param value - 缓存对象
 */
CacheUtil.prototype.setItem = function (key,value) {
    return new Promise((resolve, reject) => {
        uni.setStorage({
            key: key,
            data: value,
            success: resolve,
            fail: reject
        });
    })
}

/**
 * 删除缓存
 * @param {string} key - 缓存键名
 */
CacheUtil.prototype.remove = function (key) {
    return new Promise((resolve, reject) => {
        uni.removeStorage({
            key: key,
            success: resolve,
            fail: reject
        });
    })
}


/**
 * 导航器
 * @constructor
 */
export function NavUtil(){
}

/**
 * @return {NavUtil}
 */
NavUtil.get = function () {
    if(NavUtil.instance){
        return NavUtil.instance;
    }else{
        NavUtil.instance = new NavUtil();
        return NavUtil.instance;
    }
}

/**
 * @typedef NavigateToParma
 * @property {string} url - 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数;
 * @property {string} animationType - 窗口显示的动画效果
 * @property {number} animationDuration - 窗口动画持续时间，单位为 ms
 * @property {Object} events - 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。
 */

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param {NavigateToParma} param - 操作参数
 */
NavUtil.prototype.navigateTo = function (param) {
    return new Promise((resolve, reject) => {
        uni.navigateTo({
            ...param,
            success: resolve,
            fail: reject
        });
    })
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 * @param {string} url - 页面路径
 * @return {Promise<unknown>}
 */
NavUtil.prototype.switchTab = function (url) {
    return new Promise((resolve, reject) => {
        uni.switchTab({
            url,
            success: resolve,
            fail: reject
        });
    })
}

/**
 * 关闭所有页面，打开到应用内的某个页面。
 * @param {string} url - 页面路径
 * @returns {Promise<unknown>}
 */
NavUtil.prototype.reLaunch = function (url) {
    return new Promise((resolve, reject) => {
        uni.reLaunch({
            url,
            success: resolve,
            fail: reject
        });
    })
}

/**
 * 关闭当前页面，打开到应用内的某个页面。
 * @param {string} url - 页面路径
 * @returns {Promise<unknown>}
 */
NavUtil.prototype.redirectTo = function (url) {
    return new Promise((resolve, reject) => {
        uni.redirectTo({
            url,
            success: resolve,
            fail: reject
        });
    })
}


/**
 * @typedef NavigateBackParams
 * @property {string} delta - 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
 * @property {string} animationType - 窗口显示的动画效果，详见：窗口动画
 * @property {number} animationDuration - 窗口动画持续时间，单位为 ms
 */

/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
 * @param {NavigateBackParams} params
 */
NavUtil.prototype.navigateBack = function (params) {
    return new Promise((resolve, reject) => {
        uni.navigateBack({
            ...params,
            success: resolve,
            fail: reject
        })
    })
}
/**
 * 获取事件传递中的数据
 * @param e - 事件对象
 * @param key - 可选参数，从事件中取出指定的数据
 */
export function getEventData(e,key){
    if(typeof e === "object" && 'currentTarget' in e && 'dataset' in e.currentTarget){
        const dataset = e.currentTarget.dataset;
        if(typeof dataset === "object"){
            if(typeof key === "string" && key in dataset){
                return dataset[key];
            }else{
                return dataset;
            }
        }
    }
    return null;
}
