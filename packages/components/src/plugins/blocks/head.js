// import { Plugin, addListener, showCommand, syncDom } from "@super-doc/api";
// export default class Head extends Plugin.BlockBase {
//   config = null;
//   fontSize = {
//     'h1': '32px',
//     'h2': '25px',
//     'h3': '18px',
//     'h4': '16px',
//     'h5': '14px',
//     'h6': '12px',
//   };
//   marginTop = {
//     'h1':'26px',
//     'h2':'21px',
//     'h3':'18px',
//     'h4':'16px',
//   }
//   marginBottom = {}

//   translateEl = null;

//   constructor(options) {
//     super(options);
//     const { config, ...other } = options;
//     this.config = config;
//   }

//   render() {
//     const el = document.createElement(this.config.data.level);
//     el.setAttribute(
//       "placeholder",
//       `标题${this.config.data.level.replace("h", "")}`
//     );
//     el.style.padding = 0;
//     el.style.margin = 0;
//     el.style['font-weight'] = 'bold';
//     el.style['font-size'] = this.fontSize[this.config.data.level];
//     el.style['line-height'] = '1.45';
//     this.setStyle(el)
//     el.setAttribute('id', "superdoc-paragraph");
//     const _template = document.createElement("div");
//     _template.innerHTML = this.config.data.text;
//     el.innerHTML = this.config.data.text;
//     this.bindUpdateEvent(el);

//     // 外层
//     const container = document.createElement('div');
//     container.classList.add('head-container');
//     container.appendChild(el);

//     // // 翻译
//     const translate = document.createElement('div');
//     translate.classList.add('translate');
//     translate.classList.add('super-doc-common-hidden');
//     translate.innerHTML = `<span>原：</span>${this.config.data.translate}`;
//     container.appendChild(translate);
    
//     this.translateEl = translate;
//     return container;
//   }

//   setStyle(el){
//     let marginTop = this.marginTop[this.config.data.level]
//     marginTop && (el.style["margin-top"] = marginTop)
//     let marginBottom = this.marginBottom[this.config.data.level] || '12px';
//     marginBottom && (el.style["margin-bottom"] = marginBottom)
//   }

//   bindUpdateEvent(el) {
//     addListener("update", (block) => {
//       if(block &&  this.config.id === block.id) {
//         const _template = document.createElement("div");
//         _template.innerHTML = block.data.text;
//         console.log(el, '====el====');
//         console.log(_template, '====_template====');
//         // syncDom(el, _template);

//         // if(block.data.translate) {
//         //   this.translateEl.classList.remove('super-doc-common-hidden');
//         //   this.translateEl.classList.add('super-doc-common-show');
//         // }
//       }
//     });
    
//   }

// }





import { Plugin , generateHeadData,complieHTMLToBlockData } from "@super-doc/api";
import _Head from '../../components/head.vue';
import * as _ from '@super-doc/share';

export default class Head extends Plugin.BlockBase {
  config = null;
  platform = "vue";
  name = "Head"
  constructor(options) {
    super(options);
    if (!options) return;
    const { config, ...other } = options;
    this.config = config;
    
    this.editor = false;
  }

  render() {
    return _Head;
  }

  // 复制回调构建blockData数据
  copyEventCallBack(context,event, blockInstance){
    console.log(`【superDoc】: 执行复制_head`);
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
    let manager = context.Event.Editor.BlockManager;
    console.log(`【superDoc】: 执行剪切_head`,cutData,blockInstance);
    let text = blockInstance.element.querySelector("[block-id]").firstChild?.firstChild?.innerHTML || ""
    if(!text){
      // manager.removeBlock(cutData.id);
      return
    }else{
      let headObject = generateHeadData(blockInstance.data.level)
      headObject.data.text = text;
      headObject.id = blockInstance.id
      return headObject
    }
  }

  /**
   * 粘贴事件
   * @param {*} context 文档编辑器上下文
   * @param {*} event 粘贴event
   * @returns 
   */
  pasteEventCallBack(context,event){
    console.log(`【superDoc】: 执行粘贴_head`);
    let manager = context.Event["Editor"].BlockManager
    let focusBlock =  manager.curentFocusBlock;
    let { block, type, status, data ,selectionContent} = manager.currentCopyBlockInfo
    let deepCloneBlock = _.deepCloneRefreshId(data, [
      "id",
    ]);
    // TODO:考虑抽离。因为所有都要这样旁段
    selectionContent = selectionContent.filter(i=>!!i)
    var clipboardData = event.clipboardData || window["clipboardData"]; // 获取剪贴板数据对象
    let clipboardText = clipboardData.getData("text/plain");
    let textList = clipboardText.split('\r\n').filter(i =>!!i)
    // 这里是为了校验是否是从外部复制粘贴过来的内容
    if(textList.every((t,index)=> t == selectionContent[index])){
      if(type == "text"){
        if(!focusBlock.data.text){
          // var clipboardData = event.clipboardData || window["clipboardData"]; // 获取剪贴板数据对象
          // var text =
          // manager.currentCopyBlockInfo.content ||
          // clipboardData.getData("text/plain"); // 获取纯文本格式的复制内容
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

  compileData(instance,text){
    console.log(text,'compileData')
    return _.compileHead(text,instance.data.level)
  }

  /**
   * 标题栏选中事件回调
   * @param {*} context 文档编辑器上下文
   * @param {*} event 
   * @param {*} selectionDom 选中的dom
   * @param {*} blockInstance 当前选中block的实例
   */
  selectionCallBack(context,event,selectionDom, currentInstance, type = "text"){
   try{
    console.log(`【superDoc】: 执行选中回调_head`);
    let manager = context.Editor.BlockManager;
    let text = type == "text" ? selectionDom.innerHTML : selectionDom.querySelector("#superdoc-paragraph").innerHTML
    const headObject = generateHeadData(currentInstance.data.level);
    headObject.id = currentInstance.id; // 赋值当前选中的文本的block实例id
    headObject.data.text = text; // 选中文本的赋值
    manager.currentSelectionBlockInfo.data.push(headObject); // 记录选中的blockData
    // 构建选中的文本内容
    manager.currentSelectionBlockInfo.selectionContent.push(text); // 记录选中的文本
   }catch(e){
    console.error(`【superDoc】: 执行选中回调_head失败`,e);
   }
  }
}
