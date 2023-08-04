const Constant = {
    // api请求前缀
    HTTP_REQUEST_ORIGIN: 'https://baidu.com'
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
