import { Plugin , generateListData} from "@super-doc/api";
import _List from '../../components/list/index.vue';
import * as _ from '@super-doc/share';

export default class ListDoc extends Plugin.BlockBase {
  config = null;
  platform = "vue";
  constructor(options) {
    super(options);
    if (!options) return;
    const { config, ...other } = options;
    this.config = config;
    
    this.editor = false;
  }

  render() {
    return _List;
  }

  copyEventCallBack(context,event,blockInstance){
    console.log(`【superDoc】: 执行复制_ListDoc`);
    // let manager = context.Event["Editor"].BlockManager
    // let listDocArr = selectionDom.querySelectorAll("[id]")
    // let listObject = generateListData(blockInstance.data.type)
    // listDocArr.forEach((item)=>{
    //   listObject.data.list.push({id: _.generateBlockId(),text:item.innerHTML})
    // })
    // manager.currentCopyBlockInfo.data.push(listObject)
  }
  /**
   * 剪切数据，返回最终被剪切后的结果
   * @param {*} context 文档编辑器上下文
   * @param {*} event 事件
   * @param {*} cutData 剪切的数
   * @param {*} blockInstance block实例
   * @returns 
   */
  cutEventCallBack(context, event, cutData, blockInstance){
    console.log(`【superDoc】: 执行剪切_ListDoc`,cutData,blockInstance);
    let manager = context.Event.Editor.BlockManager;
    let listDoc = blockInstance.element.querySelectorAll("[id]");
    // 处理被剪切后所应展示的内容
    if(listDoc.length==0){
      return 
    }else{
      let data = blockInstance.data;
      let copyList = JSON.parse(JSON.stringify(data.list))
      for(let i=0; i<= copyList.length-1; i++){
        let element = [...listDoc].find((f)=> f.getAttribute('id') == copyList[i].id)
        if(element){
          if(element.innerHTML){ // 有文本覆盖
            copyList[i].text = element.innerHTML;
          }else{
            // 无文本删除内容
            copyList.splice(i,1)
            i--
          }
        }else{
          copyList.splice(i,1)
          i--
        }
      }
      let listObject = generateListData(blockInstance.data.type)
      listObject.data.list = copyList;
      listObject.id = blockInstance.id
      return listObject
    }
  }

  pasteEventCallBack(context,event){
    console.log(`【superDoc】: 执行粘贴_ListDoc`);
    let manager = context.Event["Editor"].BlockManager;
    let focusBlock = manager.curentFocusBlock;
    let { block, type, status, data} = manager.currentCopyBlockInfo
    let deepCloneBlock = _.deepCloneRefreshId(data, ["id"]) ;
    if(type == "text"){
      return
    }
    // 判断内容类型是否全都是ListDoc  否则 截断当前内容 TODO
    let targetId = event.target.getAttribute("id")
    let targetIndex
    let targetListObj;
    focusBlock.data.list.some((item,i)=>{
      if(item=> item.id == targetId){
        targetListObj = item;
        targetIndex = i;
        return true
      }
    })
    if(deepCloneBlock.every(i=>["ul","ol"].includes(i.data.type))){}
      //暂时处理: 粘贴的是块级节点 , 直接添加到当前节点尾部
      const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
      manager.blocks.splice(currentBlockIndex + 1, 0, ...deepCloneBlock);
      event.preventDefault();

   
  }

  compileData(blockInstance,text){
    return [_.compileListData([{text}],blockInstance.data.type)]
  }

  selectionCallBack(context,event,selectionDom, currentInstance, type = "text"){
    try{
      console.log(`【superDoc】: 执行选中回调_ListDoc`);
      let manager = context.Editor.BlockManager;
      let listType = currentInstance.data.type
      let listObject = generateListData(listType)
      if(type == "text") {
        listObject.data.list.push({text:selectionDom.innerHTML, id: _.generateBlockId()})
        manager.currentSelectionBlockInfo.selectionContent.push(selectionDom.innerHTML);
      }else{
        let listDocArr = selectionDom.querySelectorAll("[id]")
        listDocArr.forEach((item)=>{
          listObject.data.list.push({id: item.getAttribute('id'),text:item.innerHTML})
          manager.currentSelectionBlockInfo.selectionContent.push(item.innerHTML);
        })
      }
      listObject.id = currentInstance.id;
      manager.currentSelectionBlockInfo.data.push(listObject)
    }catch(e){
      console.log(`【superDoc】: 执行选中回调_ListDoc失败`, e);
    }
  }
}
