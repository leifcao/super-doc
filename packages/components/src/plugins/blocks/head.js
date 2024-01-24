import { Plugin, addListener, showCommand, syncDom } from "@super-doc/api";
export default class Head extends Plugin.BlockBase {
  config = null;
  fontSize = {
    'h1': '32px',
    'h2': '25px',
    'h3': '18px',
    'h4': '16px',
    'h5': '14px',
    'h6': '12px',
  };
  marginTop = {
    'h1':'26px',
    'h2':'21px',
    'h3':'18px',
    'h4':'16px',
  }
  marginBottom = {}

  constructor(options) {
    super(options);
    const { config, ...other } = options;
    this.config = config;
  }

  render() {
    const el = document.createElement(this.config.data.level);
    el.setAttribute(
      "placeholder",
      `标题${this.config.data.level.replace("h", "")}`
    );
    el.style.padding = 0;
    el.style.margin = 0;
    el.style['font-weight'] = 'bold';
    el.style['font-size'] = this.fontSize[this.config.data.level];
    el.style['line-height'] = '1.45';
    this.setStyle(el)
    el.setAttribute('id', "superdoc-paragraph");
    const _template = document.createElement("div");
    _template.innerHTML = this.config.data.text;
    el.innerHTML = this.config.data.text;
    this.bindUpdateEvent(el);
    return el;
  }

  setStyle(el){
    let marginTop = this.marginTop[this.config.data.level]
    marginTop && (el.style["margin-top"] = marginTop)
    let marginBottom = this.marginBottom[this.config.data.level] || '12px';
    marginBottom && (el.style["margin-bottom"] = marginBottom)
  }

  bindUpdateEvent(el) {
    addListener("update", (block) => {
      if(block &&  this.config.id === block.id) {
        const _template = document.createElement("div");
        _template.innerHTML = block.data.text;
        syncDom(el, _template);
      }
    });
    
  }

}
