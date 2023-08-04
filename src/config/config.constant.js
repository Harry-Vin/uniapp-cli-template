const Constant = {
    // api请求前缀
    HTTP_REQUEST_ORIGIN: 'https://baidu.com',
    // upload请求前缀
    HTTP_UPLOAD_ORIGIN: 'https://baidu.com',
    // 登录页路径
    LOGIN_PAGE_PATH: '/pages/login/login'
}

const CacheKey = {

}

let instance = null;

export default class ConfigConstant {

    /**
     * @return {ConfigConstant}
     */
    static getInstance(){
        if(instance){
            return instance;
        }else{
            instance = new ConfigConstant();
            return instance;
        }
    }

    getConstant(){
        return Object.assign({},Constant);
    }

    getCacheKey(){
        return Object.assign({},CacheKey);
    }
}
