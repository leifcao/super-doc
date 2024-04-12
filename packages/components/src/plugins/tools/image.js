import { Plugin } from '@super-doc/api'
import * as _ from '@super-doc/share';

export default class ImageTool extends Plugin.ToolPluginBase {
    type = "ImageDoc";
    text = "图片";
    icon = null;
    nodeName = ["img","IMG"]

    blockData = {
      type: this.type,
      data: {
        desc: '',
        url: ''
      },
      class: this.type,
    };
  
    constructor(options) {
      super(options);
      this.getIcon();
    }
  
    getIcon() {
      const div = document.createElement("div");
      div.textContent = "图片";
      return div;
    }
    complieHTMLToBlockData(node,blockData){
      let desc = node.getAttribute("alt")
      let url = node.getAttribute("src")
      blockData.push(_.compileImageData({desc,url}))
    }

    deComplieBlockDataToHTML(block){
      return `<div class="" block-type="${this.type}" id="${block.id}">\r\n <img alt="${block.data.desc}" src="${block.data.url}" />\r\n </div>`
    }

    checkMdToolType(str){
        let exp = /!\[.*?\]\(.*?\)/
        return exp.test(str)
    }
    // md 转blockdata image
    compileMdToBlockData(str,blockData){
      let urlList = str.match(/\((.*?)\)/)
      let descList = str.match(/\[(.*?)\]/)
      blockData.push(_.compileImageData({desc:descList[1],url:urlList[1]}))
    }

}