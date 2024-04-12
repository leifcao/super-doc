import { Plugin } from "@super-doc/api";
import * as _ from '@super-doc/share';
export default class TodoListTool extends Plugin.ToolPluginBase {
  type = "TodoList";
  text = "代办列表";
  icon = null;

  blockData = {
    type: this.type,
    data: {
      list: [{ id: _.generateBlockId(), finish: false, task: "" }],
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

  // str解析成blockData
  complieHTMLToBlockData(node,blockData){
    if(typeof node.innerHTML !== "undefined") {
      // 为了能够每个元素都能编辑，遍历元素追加内容
      let todoList = []
      node.childNodes.forEach(element=>{
        if(typeof element.innerHTML == "undefined") return
        let finish = element.querySelector("input").checked ? true : false
        let task = element.querySelector("label").innerHTML
        todoList.push({ id: element.id || _.generateBlockId(), finish, task })
      })
      let todoData = _.compileTodoData(todoList);
      todoData.id = node.id || _.generateBlockId()
      blockData.push(todoData)
    }
  }

  // 反解析成htmlstring
  deComplieBlockDataToHTML(block){
    return `<div block-type="${this.type}" id="${block.id}">${block.data.list.map(b=> `<p id="${b.id}"><input type="checkbox" ${b.finish ? "checked": ''}/><label>${b.task}</label></p>`).join('\r\n')}</div>`
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
        console.log("【superDoc-TodoList-撤销】-add/delete", type);
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
        console.log("【superDoc-TodoList-重做】-add/delete", type);
        this.commonHandlerUndoRedo(timeMachine, context, c , newObj)
      }else{
        super.redo(timeMachine,context, [c])
      }
    });
    context.addHistory(command);
  }
}
