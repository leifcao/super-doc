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
    if(!this.blockData) return console.error(`${this._type}没有设置默认数据`);
    return this.blockData;
  }

  // 循环追加样式属性  TODO待优化成过滤调一些dom
  loopAddStyle(node,style,attr){
    try{
      if(node && node.childNodes.length!==0){
        node.childNodes.forEach((element)=>{
          if(element.textContent == ""){
            element.remove();
          }else{
            element.style && (element.style = '');
            if(element instanceof HTMLElement){
              Object.keys(style).forEach(key=>{
                element.style.setProperty(key, style[key]);
              })
              Object.keys(attr).forEach((key)=>{
                element.setAttribute(key,attr[key])
              })
              this.loopAddStyle(element,style,attr)
            }
          }
        })
      }
    }catch(e){
      console.error('循环添加属性错误',e, node)
    }
    
  }
}
