import { Plugin } from "@super-doc/api";
import _Table from "../../components/table/index.vue";
import * as _ from '@super-doc/share';

export default class TableDoc extends Plugin.BlockBase {
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
    return _Table;
  }
  copyEventCallBack(context,event, blockInstance){
    console.log('copy')
  }
  cutEventCallBack(context,event,cutData, blockInstance){}

  compileData(blockInstance,text){
    let manager = blockInstance.BlockManager;
    // let tableVue = blockInstance.currentElement.__vue__;
    // let currentRow = tableVue.currentRow;


    // _.genearteTableData
    return 
  }

  selectionCallBack(context,event, selectionDom, currentInstance, type = "text"){
    try{
      console.log(`【superDoc】: 执行选择_table`);
      let manager = context.Editor.BlockManager
      // 这里不做text判断 ,自行处理判断逻辑
      let tableFlag = selectionDom.querySelector("table")
      if(!tableFlag) {
        return;
      }
      console.log(currentInstance,'tabletable');
      let trList = selectionDom.querySelectorAll("tbody tr");
      let title = currentInstance.data.title;
      let cellKeyList = title.map((t=> t.value.split(".")[1].replace("}", "")));
      let table = [...trList].reduce((arr,item)=>{
        let cellObject = cellKeyList.reduce((cell,key)=>{
          let cellElement = item.querySelector(`[cellKey="${key}"]`)
          cell[key] = cellElement? cellElement.innerHTML : '-'
          manager.currentSelectionBlockInfo.selectionContent.push(cell[key] )
          return cell;
        },{})
        arr.push(cellObject)
        return arr;
      },[])
      let tableObject ={
        id: currentInstance.id,
        data:{ title, table},
        class: currentInstance.class,
        type: currentInstance.type
      }
      manager.currentSelectionBlockInfo.type = "block"
      manager.currentSelectionBlockInfo.data.push(tableObject)

    }catch(e){
      console.error(`【superDoc】: 执行选择_table失败`,e)
    }
   
  }
}
