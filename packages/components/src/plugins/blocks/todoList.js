import { Plugin ,generateTodoData} from "@super-doc/api";
import _TodoList from "../../components/todoList/index.vue";
import * as _ from '@super-doc/share';

export default class TodoList extends Plugin.BlockBase {
  config = null;
  platform = "vue";
  constructor(options) {
    super(options);
    if (!options) return;
    const { config, ...other } = options;
    this.config = config;

    this.editor = true;
  }

  render() {
    return _TodoList;
  }
   copyEventCallBack(context,event,blockInstance){
    console.log(`【superDoc】: 执行复制_TodoList`);
  }


  pasteEventCallBack(context,event){
    console.log(`【superDoc】: 执行粘贴_TodoList`);
    let manager = context.Event["Editor"].BlockManager;
    let focusBlock = manager.curentFocusBlock;
    let { block, type, status, data} = manager.currentCopyBlockInfo
    let deepCloneBlock = _.deepCloneRefreshId(data, ["id"]) ;
    if(type == "text"){
      return
    }
      //暂时处理: 粘贴的是块级节点 , 直接添加到当前节点尾部
      const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
      manager.blocks.splice(currentBlockIndex + 1, 0, ...deepCloneBlock);
      event.preventDefault();
  }
  cutEventCallBack(context,event,cutData,blockInstance){
    let manager = context.Event.Editor.BlockManager;

  }


  compileData(blockInstance,text){
    return [_.compileTodoData([{task:text,finish:false}])]
  }

  selectionCallBack(context,event,selectionDom, currentInstance, type = "text"){
   try{
      console.log(`【superDoc】: 执行选择_TodoList`);
      let manager = context.Editor.BlockManager;
      let todoObject = generateTodoData()
      if(type == "text") {
        todoObject.data.list.push({task:selectionDom.innerHTML, id: _.generateBlockId(), finish:false})
        manager.currentSelectionBlockInfo.selectionContent.push(selectionDom.innerHTML);
      }else{
        let todoArr = selectionDom.querySelectorAll("[task-id]")
        todoArr.forEach((item)=>{
          let finish = item.querySelector("label")?.className.includes("is-checked") ? true : false
          let task = item.querySelector('[id]')?.innerHTML || ""
          todoObject.data.list.push({id: item.getAttribute("task-id"),task ,finish })
          manager.currentSelectionBlockInfo.selectionContent.push(task);
        })
      }
      todoObject.id = currentInstance.id
      manager.currentSelectionBlockInfo.data.push(todoObject)
   }catch(e){
    console.error(`【superDoc】: 执行选择_TodoList失败`,e);
   }
  }
}