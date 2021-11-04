export namespace Entity{

    export class SceneTest{
        text:string
    }


    export class Res{
        //是否是bundle模块
        isBundle:boolean
        //需要加载的资源["",{type:"json | spine",url:""}]
        res:Array<any>
        //bundle
        bundleName:string;
        //prefabPath
        prefabPath:string;
    }
    
    export enum ResType{
        JSON = "json",
        IMG = "img",
        SPINE = "spine"
    }
}