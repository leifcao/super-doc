import { isObject, isArray } from "@super-doc/share";
import { SNAPSHOOT_TYPE } from "../../timeMachine/src/typing";

export default class CommandManager {
  public history = [];
  public future = [];
  public timeMacLine;

  constructor(context) {
    console.log("context", this);
    this.timeMacLine = context;
  }

  addHistory(command: any, tag?:boolean) {
    let history = isArray(command) ? command : [command];
    tag && (this.future = [])
    this.history.push(history);
  }
  addFuture(command) {
    let future = isArray(command) ? command : [command];
    this.future.push(future);
  }

  canRedo() {
    if (this.future.length == 0) {
      return false;
    } else return true;
  }
  canUndo() {
    if (this.history.length == 0) {
      return false;
    } else return true;
  }

  // 重做
  redo() {
    if(this.canRedo()){
      let command = this.future.slice(-1)[0];
      const { target, key, old: oldObj, new: newObj, type } = command[0];
      let block;
      if(target.OBJECT_PATH){
        const blockIndex = Number(target.OBJECT_PATH.split('.')[0].replace('[', '').replace(']', ''));
        block = this.timeMacLine.target[blockIndex];
      }
      const BlockManager = this.timeMacLine.option.context;
      let toolInstances = BlockManager.getToolByType(block?.type || "Head")
      if(toolInstances){
        toolInstances.redo(this.timeMacLine,this);
      }
    }
  }

  // 撤销
  undo() {
    if (this.canUndo()) {
      let command = this.history.slice(-1)[0];
      const { target, key, old: oldObj, new: newObj, type } = command[0];
      let block;
      if(target.OBJECT_PATH){
        const blockIndex = Number(target.OBJECT_PATH.split('.')[0].replace('[', '').replace(']', ''));
        block = this.timeMacLine.target[blockIndex];
      }
      const BlockManager = this.timeMacLine.option.context;
      let toolInstances = BlockManager.getToolByType(block?.type || "Head")
      if(toolInstances){
        toolInstances.undo(this.timeMacLine,this);
      }
    }
  }

  excuteCommand(command) {
    const { target, key, old: oldObj, new: newObj, type, change } = command;
    if (type === SNAPSHOOT_TYPE.DELETE) {
      const proxys = change.map((item) => this.timeMacLine.proxyMap.get(item));
      this.timeMacLine.option?.events?.delete?.(proxys);
    } else if (type === SNAPSHOOT_TYPE.ADD) {
      const proxys = change.map((item) => this.timeMacLine.proxyMap.get(item));
      this.timeMacLine.option?.events?.add?.(proxys);
    } else if (type === SNAPSHOOT_TYPE.UPDATE) {
      this.timeMacLine.option?.events?.[type]?.(
        this.timeMacLine.getState(target),
        key,
        this.timeMacLine.getState(target)[key]
      );
    }
  }
}
