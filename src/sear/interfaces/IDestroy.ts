module sear.interfaces {
    
    /**
     * 可销毁的对象，原则上销毁后不可再使用
     * 
     * @author pbk
     */
    export interface IDestroy {
        readonly destroyed :boolean;
        destroy():void;
    }
}