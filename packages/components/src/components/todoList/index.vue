<template>
  <div class="todo-container">
    <TodoItem
      v-for="todo in list"
      :key="todo.id"
      :todo="todo"
      :focus="focusId === todo.id"
      :blockId="blockId"
      @add="addHandler"
      @remove="removeHandler"
      style="margin-top: 2.6px; margin-bottom: 2.6px;padding-left: 0px;"
    ></TodoItem>
  </div>
</template>

<script>
import { getBlockData, generateId } from "@super-doc/api";
import TodoItem from "./todoItem.vue";
export default {
  props:["$superConfig"],
  data() {
    return {
      list: getBlockData(this.$attrs["block-id"]).data.list,
      blockId: this.$attrs["block-id"],
      focusId: ''
    };
  },
  components: {
    TodoItem,
  },
  methods: {
    initData() {
      this.list.PROXY_TARGET.forEach((item) => (item.id = generateId()));
    },
    addHandler(id) {
      const focusId = generateId();
      this.list.some((item, index) => {
        if (item.id === id) {
          this.list.splice(index + 1, 0, {
            task: "",
            id: focusId,
            finish: false,
          });
          return true;
        }
      });
      this.focusId = focusId;
    },
    removeHandler(id) {
      let i;
      this.list.some((item, index) => {
        if (item.id === id) {
          i = index;
          this.list.splice(index, 1);
          return true;
        }
      });
      this.removeListItem(id,i)
    },
    removeListItem(id,index){
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
        let preListDom = document.querySelector(`[task-id="${preListItem?.id}"]`)
        if(preListDom){
          let foucsDom = preListDom.querySelector("[id]")
          if (preListItem.task.length > 0) {
            let range = document.createRange();
            range.selectNodeContents(foucsDom.lastChild)
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
         }
          foucsDom.focus()
        }
      }
    }
  },
  created() {
    this.initData();
  },
  mounted() {
  },
};
</script>

<style lang="less" scoped>
.todo-container {

}
</style>
