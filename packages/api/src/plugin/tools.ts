import { isArray } from "@super-doc/share";
import { SNAPSHOOT_TYPE } from "../../../timeMachine/src/typing";

export class ToolPluginBase {
  _type = null;
  _icon = null;
  _config = null;
  blockData = null;
  constructor(config, ...other) {
    this._config = config;
  }

  _click() {
    return;
  }

  _getBlockData() {
    if (!this.blockData) return console.error(`${this._type}没有设置默认数据`);
    return this.blockData;
  }

  // 循环追加样式属性  TODO待优化成过滤调一些dom
  loopAddStyle(node, style, attr) {
    try {
      if (node && node.childNodes.length !== 0) {
        node.childNodes.forEach((element) => {
          if (element.textContent == "") {
            element.remove();
          } else {
            element.style && (element.style = "");
            if (element instanceof HTMLElement) {
              Object.keys(style).forEach((key) => {
                element.style.setProperty(key, style[key]);
              });
              Object.keys(attr).forEach((key) => {
                element.setAttribute(key, attr[key]);
              });
              this.loopAddStyle(element, style, attr);
            }
          }
        });
      }
    } catch (e) {
      console.error("循环添加属性错误", e, node);
    }
  }

  // undo
  undo(timeMachine, context) {
    let command = context.history.pop();
    command.forEach((c) => {
      const { target, key, old: oldObj, new: newObj, type } = c;
      // const blockIndex = Number(target.OBJECT_PATH.split('.')[0].replace('[', '').replace(']', ''));
      // const block = timeMachine.target[blockIndex];
      if (type === SNAPSHOOT_TYPE.UPDATE) {
        target[key] = oldObj;
        context.excuteCommand(c);
        console.log("【superDoc-撤销-默认】-update", timeMachine.target);
      } else {
        console.log("【superDoc-撤销-默认】-add/delete", type);
        if (isArray(oldObj)) {
          const blockIndex = Number(
            target.OBJECT_PATH.split(".")[0].replace("[", "").replace("]", "")
          );
          const block = timeMachine.target[blockIndex];
          let length = timeMachine.target.length;
          timeMachine.target.PROXY_TARGET.splice(0, length, ...oldObj);
          c.type =
            type === SNAPSHOOT_TYPE.ADD
              ? SNAPSHOOT_TYPE.DELETE
              : SNAPSHOOT_TYPE.ADD;
          context.excuteCommand(c);
        }
      }
    });
    context.addFuture(command);
  }

  // redo
  redo(timeMachine, context) {
    let command = context.future.pop();
    command.forEach((c) => {
      const { target, key, old: oldObj, new: newObj, type } = c;
      if (type === SNAPSHOOT_TYPE.UPDATE) {
        console.log("【superDoc-重做】-update", timeMachine.target);
        target[key] = newObj;
        context.excuteCommand(c);
      } else {
        console.log("【superDoc-重做】-add/delete", type);
        if (isArray(newObj)) {
          let length = timeMachine.target.length;
          timeMachine.target.PROXY_TARGET.splice(0, length, ...newObj);
          c.type =
            type === SNAPSHOOT_TYPE.ADD
              ? SNAPSHOOT_TYPE.DELETE
              : SNAPSHOOT_TYPE.ADD;
          context.excuteCommand(c);
        }
      }
    });
    context.addHistory(command);
  }
}
