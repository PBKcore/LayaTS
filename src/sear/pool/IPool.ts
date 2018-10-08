module sear.pool {
    import IDestroy = sear.interfaces.IDestroy;
    
    /**
     * 放入对象池实现接口
     * 
     * @author pbk
     */
    export interface IPool extends IDestroy {
        /** 能放入对象池，清理对象*/
        clear():void;
        recover():void;
    }
}