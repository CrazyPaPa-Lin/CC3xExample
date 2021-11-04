
import { _decorator, Component, Node, director, assetManager } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BundleTest
 * DateTime = Sun Oct 24 2021 16:23:36 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = BundleTest.ts
 * FileBasenameNoExtension = BundleTest
 * URL = db://assets/cacse/Bundle/BundleTest.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('BundleTest')
export class BundleTest extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onClickBundle01(){
        assetManager.loadBundle("Bundle01",(err,bundle)=>{
            if(!err){
                director.loadScene('Bundle01Scene', function () {

                });
            }
        })
      
    }

    onClickBundle02(){
        director.loadScene('Bundle02Scene', function () {

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
 */
