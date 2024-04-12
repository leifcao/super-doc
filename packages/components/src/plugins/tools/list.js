import { Plugin } from "@super-doc/api";
import { generateBlockId } from "../../../../share/src";
import * as _ from "@super-doc/share";

export default class ListTool extends Plugin.ToolPluginBase {
  type = "ListDoc";
  text = "列表";
  icon = null;
  nodeName = ["UL", "OL", "ol", "ul"];

  blockData = {
    type: this.type,
    data: {
      type: "ul",
      list: [{ text: "", id: generateBlockId() }],
    },
    class: this.type,
  };

  constructor(options) {
    super(options);
    this.getIcon();
  }

  getIcon() {
    const div = document.createElement("div");
    div.textContent = "L";
    return div;
  }
  complieHTMLToBlockData(node, blockData) {
    let list = [];
    node.childNodes.forEach((c) => {
      if (typeof c.innerHTML !== "undefined") list.push({ text: c.innerHTML });
    });
    blockData.push(_.compileListData(list, node.nodeName.toLowerCase()));
  }

  deComplieBlockDataToHTML(block) {
    return `<${block.data.type} block-type="${block.type}">${block.data.list
      .map((item) => {
        return `<li>${item.text}</li>`;
      })
      .join("\r\n")}</${block.data.type}>`;
  }


  commonHandlerUndoRedo(timeMachine,context, command , changeObj){
    const { target, type } = command;
    if (_.isArray(changeObj)) {
      const blockIndex = Number(
        target.OBJECT_PATH.split(".")[0].replace("[", "").replace("]", "")
      );
      const block = timeMachine.target[blockIndex];
      let length = block.data.list.length;
      block.data.list.PROXY_TARGET.splice(0, length, ...changeObj);
      command.type = type === "add" ? "delete" : "add";
      context.excuteCommand(command);
    }
  }

  undo(timeMachine, context) {
    let undoCommand = context.history.pop();
    undoCommand.forEach((c) => {
      const { target, key, old: oldObj, new: newObj, type } = c;
      if (type !== "update") {
        console.log("【superDoc-listDoc-撤销】-add/delete", type);
        this.commonHandlerUndoRedo(timeMachine, context, c , oldObj)
      }else{
        super.undo(timeMachine,context, [c])
      }
    });
    context.addFuture(undoCommand);
  }

  redo(timeMachine, context) {
    let command = context.future.pop();
    command.forEach((c) => {
      const { target, key, old: oldObj, new: newObj, type } = c;
      if (type !== "update") {
        console.log("【superDoc-listDoc-重做】-add/delete", type);
        this.commonHandlerUndoRedo(timeMachine, context, c , newObj)
      }else{
        super.redo(timeMachine,context, [c])
      }
    });
    context.addHistory(command);
  }

  // checkMdToolType(str){
  //   if(str.startsWith("- ")){
  //     return true
  //   }
  //   if(str.startsWith("+ ")){
  //     return true
  //   }
  // }

  // compileMdToBlockData(str,blockData){
  //   blockData.push(..._.compileListData(str))
  // }
}
