import { Plugin ,generateParagraphData ,complieHTMLToBlockData } from "@super-doc/api";
import _Paragraph from '../../components/paragraph.vue';
import * as _ from '@super-doc/share';

export default class Paragraph extends Plugin.BlockBase {
  config = null;
  platform = "vue";
  name = "Paragraph"
  constructor(options) {
    super(options);
    if (!options) return;
    const { config, ...other } = options;
    this.config = config;
    
    this.editor = false;
  }

  render() {
    return _Paragraph;
  }

  compileData(blockInstance,text){
    return _.compileParagraph(text)
  }

  copyEventCallBack(context,event, blockInstance){
    console.log(`【superDoc】: 执行复制_paragraph`);
    // let manager = context.Event["Editor"].BlockManager
    // let text = copyDom.querySelector("#superdoc-paragraph").innerHTML
    // let paragraphObject = generateParagraphData()
    // paragraphObject.data.text = text;
    // manager.currentCopyBlockInfo.data.push(paragraphObject)
  }

  pasteEventCallBack(context,event){
    console.log(`【superDoc】: 执行粘贴_paragraph`);
    let manager = context.Event["Editor"].BlockManager
    let focusBlock =  manager.curentFocusBlock;
    let { block, type, status, data, selectionContent} = manager.currentCopyBlockInfo
    let deepCloneBlock = _.deepCloneRefreshId(data, [
      "id",
    ]);
    selectionContent = selectionContent.filter(i=>!!i)
    // TODO:待优化
    var clipboardData = event.clipboardData || window["clipboardData"]; // 获取剪贴板数据对象
    let clipboardText = clipboardData.getData("text/plain");
    let textList = clipboardText.split('\r\n').filter(i =>!!i)
    // 这里是为了校验是否是从外部复制粘贴过来的内容
    if(textList.every((t,index)=> t == selectionContent[index])){
      if(type == "text"){
        if(!focusBlock.data.text){
          // var text =
          // manager.currentCopyBlockInfo.content ||
          // clipboardData.getData("text/plain"); // 获取纯文本格式的复制内容
          // deepCloneBlock[0].data.text = text;
          manager.replaceCurrentBlock(deepCloneBlock, focusBlock.id);
          event.preventDefault();
          return
        }
        // console.log("【superDoc】:执行默认粘贴事件");
      }else {
        // 粘贴的是块级节点 , 直接添加到当前节点尾部
        const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
        manager.blocks.splice(currentBlockIndex + 1, 0, ...deepCloneBlock);
        event.preventDefault();
      }
    }else{
      let clipboardHTML = clipboardData.getData("text/html") || `${clipboardText.split('\n').map(m=> `<p>${m}</p>`).join('')}`;
      let blockData = complieHTMLToBlockData.call(context.Event["Editor"],clipboardHTML)
      console.log("clipboardHTML",blockData)
      const currentBlockIndex = manager.blocks.findIndex(block => block.id === focusBlock.id);
      manager.blocks.splice(currentBlockIndex + 1, 0, ...blockData);
      event.preventDefault();
    }
   
  }
  /** 
   * 剪切数据，返回最终被剪切后的结果
   * @param {*} context 文档编辑器上下文
   * @param {*} event 事件
   * @param {*} cutData 剪切的数
   * @param {*} blockInstance block实例
   * @returns 
   */
  cutEventCallBack(context,event,cutData, blockInstance){
    console.log(`【superDoc】: 执行剪切_paragraph`);
    let manager = context.Event.Editor.BlockManager;
    let text = blockInstance.element.querySelector("[block-id]").firstChild?.innerHTML || "";
    if(!text){
      // manager.removeBlock(cutData.id);
      return
     }else{
      let paragraph = generateParagraphData()
      paragraph.data.text = text;
      paragraph.id = blockInstance.id
      return paragraph
     }
  }

  selectionCallBack(context,event,selectionDom, blockInstance){
    console.log(`【superDoc】: 执行选中回调_paragraph`);
    let manager = context.Editor.BlockManager
    let text = selectionDom.querySelector("#superdoc-paragraph").innerHTML
    let paragraphObject = generateParagraphData()
    paragraphObject.data.text = text;
    paragraphObject.id = blockInstance.id
    manager.currentSelectionBlockInfo.data.push(paragraphObject)
    // 记录选择的文本
    manager.currentSelectionBlockInfo.selectionContent.push(text);
  }
}
