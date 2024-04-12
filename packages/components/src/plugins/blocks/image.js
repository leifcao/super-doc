import { Plugin } from "@super-doc/api";
import _Image from '../../components/image.vue';
import * as _ from '@super-doc/share';


export default class ImageDoc extends Plugin.BlockBase {
    config = null;
    platform = "vue";
    type = "ImageDoc"
    class = "ImageDoc"
    constructor(options) {
      super(options);
      if (!options) return;
      const { config, ...other } = options;
      this.config = config;
      
      this.editor = false;
    }
  
    render() {
      return _Image;
    }

    copyEventCallBack(context,event,blockInstance){
      console.log('copy')
    }

    selectionCallBack(context,event,selectionDom, currentInstance, type = "text"){
      console.log(`【superDoc】: 执行选中回调_ImageDoc`);
      try{
        let manager = context["Editor"].BlockManager
        let imageObject = {
          id: currentInstance.id,
          data: _.deepCloneRefreshId(currentInstance.data,[]),
          type: currentInstance.type,
          class: currentInstance.class
        };
        manager.currentSelectionBlockInfo.data.push(imageObject)
      }catch(e){
        console.error(`【superDoc】: 执行选中回调_ImageDoc`);
      }
    }

}