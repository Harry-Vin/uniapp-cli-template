import {CacheUtil, NavUtil, ToastUtil} from "./util.uni";
import ConfigConstant from "@/config/config.constant";
import ConfigAction from "@/config/config.action";


/**
 *  HTTP请求封装类
 *  @author Harry.Vin
 *  @desc 封装常用的请求
 */

/**
 * 请求默认参数
 * @typedef RequestParams
 * @property {string} url - 请求路径
 * @property {string} method - 请求方法
 * @property {any} data - 请求数据
 * @property {any} header - 请求头
 * @property {boolean} needToken - 是否需要携带token
 * @property {string} urlPrefix - 请求前缀
 * @property {boolean} useUrlPrefix - 是否使用请求前缀
 * @property {Function} getToken - 获取token的方法
 */

/**
 * 携带的默认请求参数
 * @return RequestParams
 */
const getRequestConfig = () => {
    return {
        url: '', //  请求地址
        method: 'GET', // 请求类型
        data: null, // 要传数据
        header: null, //额外的请求头信息
        needToken: true, // 该请求是否需要token
        urlPrefix: ConfigConstant.getInstance().getConstant().HTTP_REQUEST_ORIGIN, // url前缀
        useUrlPrefix: true, // 是否使用url前缀
        // 获取token 当请求需要token的时候会调用该方法
        getToken: ConfigAction.getInstance().getToken
    }
}


// http 请求封装
export const request = async (config = getRequestConfig()) => {
    try {
        config = Object.assign({}, getRequestConfig(), config);
        const _header = Object.assign({}, config.header);

        if (config.needToken) {
            const token = await config.getToken();
            if (token) {
                _header.Authorization = token;
            } else {
                await ToastUtil.get().info("请登录后操作");
                setTimeout(() => {
                    NavUtil.get().reLaunch(ConfigConstant.getInstance().getConstant().LOGIN_PAGE_PATH);
                }, 2000)
                return Promise.resolve(null);
            }
        }

        return new Promise((resolve, reject) => {
            uni.request({
                url: config.useUrlPrefix ? config.urlPrefix + config.url : config.url,
                data: config.data,
                header: _header,
                method: config.method,
                dataType: 'json',
                success: (res) => {
                    resolve(res);
                },
                fail: (err) => {
                    resolve(null);
                }
            })
        })
    } catch (e) {
        return Promise.resolve(null);
    }
}

/**
 * @typedef uploadFileConfig
 * @property {string} url - 开发者服务器 url
 * @property {Array<any>} files - 需要上传的文件列表。使用 files 时，filePath 和 name 不生效。
 * @property {string} fileType - 文件类型，image/video/audio 默认：image
 * @property {File} file - 要上传的文件对象。
 * @property {string} filePath -要上传文件资源的路径。
 * @property {string} name - 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
 * @property {any} header - HTTP 请求 Header, header 中不能设置 Referer。
 * @property {number} timeout - 超时时间，单位 ms
 * @property {Object} formData - HTTP 请求中其他额外的 form data
 * @property {boolean} needToken - 是否需要token
 * @property {string} urlPrefix - 请求前缀
 * @property {boolean} useUrlPrefix - 是否使用url前缀
 * @param {Function} getToken - 获取Token
 */


/**
 * 上传请求参数
 * @return uploadFileConfig
 */
const uploadFileConfig = () => {
    return {
        url: '',
        files: [],
        fileType: 'image',
        file: null,
        filePath: '',
        name: '',
        header: null,
        timeout: 0,
        formData: null,
        needToken: false, // 该请求是否需要token
        urlPrefix: ConfigConstant.getInstance().getConstant().HTTP_UPLOAD_ORIGIN, // url前缀
        useUrlPrefix: true, // 是否使用url前缀
        getToken: ConfigAction.getInstance().getToken
    }
}

/**
 *
 * @param {uploadFileConfig} config
 * @return {Promise<unknown>}
 */
export const uploadFile = async (config = uploadFileConfig()) => {
    try {
        config = Object.assign({}, uploadFileConfig(), config);
        const _header = Object.assign({}, config.header);

        if (config.needToken) {
            const token = await config.getToken();
            if (token) {
                _header.Authorization = token;
            } else {
                await ToastUtil.get().info("请登录后操作");
                setTimeout(() => {
                    NavUtil.get().reLaunch(ConfigConstant.getInstance().getConstant().LOGIN_PAGE_PATH);
                }, 2000)
                return Promise.resolve(null);
            }
        }

        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: config.useUrlPrefix ? config.urlPrefix + config.url : config.url,
                files: config.files,
                header: _header,
                file: config.file,
                fileType: config.fileType,
                filePath: config.filePath,
                name: config.name,
                timeout: config.timeout,
                formData: config.formData,
                success: (res) => {
                    resolve(res);
                },
                fail: (err) => {
                    resolve(null);
                }
            })
        })
    } catch (e) {
        return Promise.resolve(null);
    }
}

// get请求
export const http_get = (config = getRequestConfig()) => {
    return request(config);
}

// post json 请求 （一般post传参都用这个）
export const http_post_json = (config = getRequestConfig()) => {
    config.method = "POST";
    config.header = Object.assign({}, config.header, {
        'Content-Type': 'application/json'
    });
    return request(config);
}

// post请求
export const http_post = (config = getRequestConfig()) => {
    config.method = 'POST';
    config.header = Object.assign({}, config.header, {
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    return request(config);
}

// post请求 传递 FormData 使用
export const http_post_form_data = (config = getRequestConfig()) => {
    config.method = 'POST';
    config.header = Object.assign({}, config.header, {
        'Content-Type': 'multipart/form-data'
    })
    return request(config);
}


