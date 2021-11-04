
import { _decorator, Component, Node, assetManager, resources, Prefab, instantiate } from 'cc';
import { BaseScene } from '../base/BaseScene';
import { Entity } from './Entity/Entity';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SceneManager
 * DateTime = Tue Oct 26 2021 13:50:25 GMT+0400 (GMT+04:00)
 * Author = xl000000
 * FileBasename = SceneManager.ts
 * FileBasenameNoExtension = SceneManager
 * URL = db://assets/cacse/FrameWork/Script/SceneManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('SceneManager')
export class SceneManager extends Component {

    @property(Node)
    inputNode: Node = null;

    @property(Node)
    contentNode: Node = null;

    private static _instance = null;
    public static get instance(): SceneManager {
        return SceneManager._instance;
    }

    private sceneStacks: Array<BaseScene> = null;
    private currentBaseScene: BaseScene = null;

    private sceneMap: Map<string, {prefab:Prefab,options:any}> = null;

    onLoad() {
        SceneManager._instance = this;
        this.sceneStacks = new Array();
        this.sceneMap = new Map();
    }

    start() {

    }

    /**
     * 
     * @param openScene 要打开的场景类名 必须包含path属性 
     * @param options   场景参数 
     */
    public addScene(openScene: any, options: any) {
        //因为切换场景时会加载 是异步发生的  需要打开遮罩阻止用户继续点击
        this.hideSceneTouch();
        //播放当前场景的闭场动画
        new Promise(async res => {
            //加载资源
            let resObj: Entity.Res = openScene.getRes();
            let isBundle = resObj.isBundle;
            let prefabPath = resObj.prefabPath;
            let prefab = null;
            let node: Node = null;
            let scene: BaseScene = null;
            prefab = await new Promise(cb => {
                prefab = this.sceneMap[prefabPath];
                if (prefab) {
                    cb(prefab)
                } else {
                    if (isBundle) {
                        assetManager.loadBundle(resObj.bundleName, (err, bundle) => {
                            if (!err) {
                                bundle.load(prefabPath, Prefab, (err, pb) => {
                                    if (!err) {
                                        cb(pb)
                                    } else {
                                        cb(null);
                                    }
                                })
                            } else {
                                cb(null);
                            }
                        })
                    } else {
                        resources.load(prefabPath, (err, pb: Prefab) => {
                            if (!err) {
                                cb(pb)
                            } else {
                                cb(null);
                            }
                        })
                    }
                }
            })

            if (prefab) {
                node = instantiate(prefab);
                this.contentNode.addChild(node);
                scene = node.getComponent(BaseScene);
                node.active = false;
            }
            if (scene) {
                if (this.currentBaseScene) {
                    this.currentBaseScene.hide(() => {
                        if (this.currentBaseScene) {
                            this.currentBaseScene.node.removeFromParent();
                        }
                        node.active = true;
                        scene.show(options);
                    })
                } else {
                    if (this.currentBaseScene) {
                        this.currentBaseScene.node.removeFromParent();
                    }
                    node.active = true;
                    scene.show(options);
                }
                this.currentBaseScene = scene;
                this.sceneMap[this.currentBaseScene.uuid] = {prefab:prefab,options:options};
                this.sceneStacks.push(scene);
            }
            res(scene);
        }).then(() => {
            this.openSceneTouch();
        })
    }

    public popScene(isCleanRes: boolean = false) {
        if (!this.currentBaseScene) {
            return
        }
        this.hideSceneTouch();
        let prvScene: BaseScene = null;

        if (this.sceneStacks.length >= 2) {
            prvScene = this.sceneStacks[this.sceneStacks.length - 2];
            this.contentNode.addChild(prvScene.node);
            prvScene.node.active = false;
        }


        this.currentBaseScene.hide(() => {
            this.currentBaseScene.node.removeFromParent();

            if(prvScene){
                let data = this.sceneMap[prvScene.uuid];
                
               
            }
        })

    }

    private hideSceneTouch() {
        this.inputNode.active = true;
    }

    private openSceneTouch() {
        this.inputNode.active = false;
    }


    onDestroy() {
        this.sceneStacks.length = 0;
        this.sceneStacks = null;
        SceneManager._instance = null;
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
