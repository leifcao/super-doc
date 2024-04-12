<template>
  <div class="super-list-container" :parent-id="blockId" data-select="true">
    <div class="super-list-icon" contenteditable="false" >{{ type }}</div>
    <div
      contenteditable
      ref="list-content"
      class="super-list-content"
      style="width: 100%; min-height: 22px"
      :id="listData.id"
      :key="listData.id"
      @keydown="keydownHandler"
      @input.stop.self="contentChange"
    ></div>
  </div>
</template>

<script>
import {
  syncDom,
} from "@super-doc/api";

export default {
  props: ['listData', 'isFocus', 'type',"blockId"],
  data(){
    return {
      inputTimer: null // 防抖处理
    }
  },
  watch:{
    'listData.text'(newVal,oldVal){
      this.init()
    }
  },
  methods: {
    keydownHandler(event) {
      // 回车添加
      if (event.keyCode === 13) {
        event.preventDefault();
        // 阻止冒泡
        event.stopImmediatePropagation();
        this.$emit('addHandler', this.listData.id);
      } else if(event.keyCode === 8) {
        console.log('【superDoc】list删除')
        if(!this.listData.text){
          this.$emit('remove', this.listData.id);
          event.preventDefault()
        }
        // 阻止冒泡
        if(this.$blockManager().curentFocusBlock.CURRENT_CHECKOUT_COUNT !== 3)
        event.stopImmediatePropagation();
      }
    },
    init() {
      const _div = document.createElement('div');
      _div.innerHTML = this.listData.text;
      syncDom(this.$refs['list-content'], _div);

      if(this.isFocus) {
        this.$refs['list-content'].focus(); 
      }
    },
    contentChange(event) {
      clearTimeout(this.inputTimer);
      this.inputTimer = setTimeout(() => {
        this.$emit("updateContent", {id: this.listData.id, content: event.target.innerHTML});
      }, 300);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.super-list-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  > .super-list-icon {
    margin-right: 10px;
    font-weight: 600;
     line-height: 22px;
  }
  > .super-list-content{
    line-height: 22px;
  }
}
</style>
