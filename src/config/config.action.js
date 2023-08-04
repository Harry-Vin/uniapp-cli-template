let instance = null;
export default class ConfigAction {
    /**
     * @return {ConfigAction}
     */
    static getInstance(){
        if(instance){
            return instance;
        }else{
            instance = new ConfigAction();
            return instance;
        }
    }

    async getToken(){
        return false;
    }
}
