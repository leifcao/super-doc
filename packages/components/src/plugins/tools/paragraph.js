import { Plugin, generateParagraphData } from '@super-doc/api'
import * as _ from '@super-doc/share';

export class ParagraphTool extends Plugin.ToolPluginBase {
    type = "Paragraph";
    text = "段落";
    icon = null;
    nodeName = ["P","p","span","SPAN"]

  
    blockData = generateParagraphData();
  
    constructor(options) {
      super(options);
      this.getIcon();
    }
  
    getIcon() {
      const div = document.createElement("div");
      div.textContent = "H";
      return div;
    }
    // str解析成blockData
    complieHTMLToBlockData(node,blockData){
      if(typeof node.innerHTML !== "undefined") {
        // 为了能够每个元素都能编辑，遍历元素追加内容
        this.loopAddStyle(node,{outline:"none",},{ tabIndex: 0 })
        blockData.push(..._.compileParagraph(node.innerHTML.split("\n").join('')))

      }
        // blockData.push(..._.compileParagraph(node.innerHTML))
    }

    // 反解析成htmlstring
    deComplieBlockDataToHTML(block){
      return  `<p block-type="${block.type}" id="${block.id}">${block.data.text}</p>`
    }

    // md默认转换为blockData
    compileMdToBlockData(str,blockData){
      blockData.push(..._.compileParagraph(str))
    }
   
}