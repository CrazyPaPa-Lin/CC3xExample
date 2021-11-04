
import { _decorator, Component, Node, director, Sprite, resources, warn, Asset, Texture2D, SpriteFrame, assetManager } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bundle01Test
 * DateTime = Sun Oct 24 2021 16:39:02 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = Bundle01Test.ts
 * FileBasenameNoExtension = Bundle01Test
 * URL = db://assets/cacse/Bundle/Bundle01/Bundle01Test.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('Bundle01Test')
export class Bundle01Test extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Sprite)
    testSprite:Sprite =  null;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    onClickBundle02(){
        // director.loadScene('Bundle02Scene', function () {

        // });


        // this.loadRes("txt_dt_dhty.png",(tex:Texture2D)=>{
        //     this.testSprite.spriteFrame = new SpriteFrame();
        //     this.testSprite.spriteFrame.texture = tex;
        // })


        let bundle = assetManager.getBundle("Bundle01");


        bundle.load("img/txt_dt_dhty",SpriteFrame,(err,data)=>{
            console.log("资源001-------"+data);
        })

        bundle.load("img/txt_dt_dhty.png",SpriteFrame,(err,data)=>{
            console.log("资源002-------"+data);
        })

        bundle.load("img/spriteFrame",SpriteFrame,(err,data)=>{
            console.log("资源003-------"+data);
        })

        bundle.load("img/txt_dt_dhty.spriteFrame",SpriteFrame,(err,data)=>{
            console.log("资源004-------"+data);
        })

        bundle.load("img/txt_dt_dhty.texture",SpriteFrame,(err,data)=>{
            console.log("资源005-------"+data);
        })

        bundle.load("img/texture",SpriteFrame,(err,data)=>{
            console.log("资源006-------"+data);
        })


        bundle.load("spriteFrame",SpriteFrame,(err,data)=>{
            console.log("资源007-------"+data);
        })

        bundle.load("txt_dt_dhty.spriteFrame",SpriteFrame,(err,data)=>{
            console.log("资源008-------"+data);
        })

        
        bundle.load("txt_dt_dhty.png",SpriteFrame,(err,data)=>{
            console.log("资源009-------"+data);
        })

        
        bundle.load("img/txt_dt_dhty/spriteFrame",SpriteFrame,(err,data)=>{
            console.log("资源004-------"+data);
            this.testSprite.spriteFrame = data;
        })

    }

       /**从resources目录加载asset*/
       loadRes(url:string, cb:Function, assetType?:typeof Asset):void
       {
           if(url == "" || !url){
               return
           }
           //let res = cc.loader.getRes(url, assetType);
           let res = resources.get(url,assetType);
           if(res)
           {
               cb(res);
               return;
           }
           resources.load(url, assetType, (err, res) => {
               if(err) 
               {
                   warn("loadAsset error", url);
                   return;
               }
               if(res) {
                   //this.cacheAsset(res);
                   //cc.assetManager.cacheAsset = true;
                   cb(res); 
               }
           });
       }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 * 
 * 棍  （控制 连击 战士 防御） 
 * 剑
 * 毒  （药剂师）
 * 拳  （骑士）
 * 刀
 * 弓箭（游侠）
 * 药师（牧师）
 * 
 * 龙族（加强版拳）
 * 巫术（魔法）
 * 
 * 血量
 * 基础攻击 
 * 闪避
 * 斗气
 * 
 * 
 * 战斗模块
 * 
 * 
 */
