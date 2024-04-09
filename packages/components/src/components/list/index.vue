<template>
  <div>
    <ListItem
      v-for="(item, index) in list"
      :blockId="$superConfig.blockId"
      :listData="item"
      :key="item.id"
      :isFocus="focusId"
      :type="listType.toUpperCase() === 'UL' ? '•' : index + 1"
      @addHandler="keydownHandler"
      @updateContent="updateContent"
      @remove="removeHandler"
      class="list-item"
    ></ListItem>
  </div>
</template>
<script>
import {
  showCommand,
  addListener,
  syncDom,
  markdownSyntaxTransform,
  findBlockDataForId,
  generateId,
} from "@super-doc/api";

import ListItem from "./DivEditable.vue";
export default {
  props: ["$superConfig"],
  data() {
    return {
      list: [],
      focusId: '',
      listType: 'ul'
    };
  },
  components: {
    ListItem,
  },
  methods: {
    updateContent({id, content}) {
      this.list.some((item) => {
        if(item.id === id) {
          item.text = content;
          return true;
        }
      })
      console.log('当前数据：', this.list);
    },
    keydownHandler(id) {
      this.list.some((item, i) => {
        if (item.id === id) {
          const nId = generateId();
          this.focusId = nId;
          this.list.splice(i + 1, 0, { text: "", id: nId });
          return true;
        }
      });
    },
    removeHandler(id) {
      const index = this.list.findIndex(item => item.id === id);
      this.list.PROXY_TARGET.splice(index, 1);
      const selection = window.getSelection();
      if(this.list.length == 0){
        // 空数据替换成p标签内容
        let manager = this.$superConfig.blockData.BlockManager
        let focusId = manager.curentFocusBlock.id;
        manager.replaceCurrentBlock(this.list,focusId)
      }else{
        // 聚焦上一条
        let preIndex = index - 1;
        let preListItem = this.list[preIndex]
        let preListDom = document.querySelector(`[id="${preListItem?.id}"]`)
        if(preListDom){
           preListDom.focus()
          if (preListItem.text.length > 0) {
            let range = document.createRange();
            range.setStart(preListDom.firstChild,preListItem.text.length)
            range.setEnd(preListDom.firstChild,preListItem.text.length)
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
         }
        }
        console.log('lfjs:removeHandler')
      }
    },
    initData() {
      const { list: _list, type ,} = findBlockDataForId(this.$superConfig.blockId);
      _list.PROXY_TARGET.forEach((item) => {
        item.id = item.id ? item.id : generateId();
        this.focusId = this.focusId ? this.focusId : item.id;
        return item;
      });
      this.list = _list;
      this.listType = type;
    },
    contentChange({id, text}) {
      this.list.some(item => {
        if(item.id === id) {
          item.text = text;
          return true;
        }
      })
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
<style scoped>
.list-item{
  margin-top: 2.6px;
  margin-bottom: 2.6px;
  padding-left: 0px;
}
</style>
