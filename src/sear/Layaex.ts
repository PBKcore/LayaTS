module sear {
    export class Browser extends laya.utils.Browser { }
    export class Stage extends laya.display.Stage { }
    export class Node extends laya.display.Node { }
    export class Sprite extends laya.display.Sprite { }
    export class Event extends laya.events.Event { }
    export class Keyboard extends laya.events.Keyboard { }
    export class Render extends laya.renders.Render { }
    export class Texture extends laya.resource.Texture { }
    export class Matrix extends laya.maths.Matrix { }
    export class Component extends laya.ui.Component { }

    export const superGet: (clas: any, o: any, prop: string) => any = Laya.superGet;
    export const superSet: (clas: any, o: any, prop: string, value: any) => void = Laya.superSet;
    export const getset: (isStatic: boolean, o: any, name: string, getfn: Function, setfn: Function) => void = Laya.getset;
}