<template>
  <div class="table-context-menu" v-show="contextMenuDisplay">
    <ul>
      <li
        v-for="item in contextList"
        :key="item.operation"
        @click="$emit('contextClick', item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import contextMenu from './contextMenu'
export default {
  name: "",
  props: ["type"],
  data() {
    return {
      contextMenuDisplay: false,
      contextList: contextMenu.head
    };
  },
  watch: {
    type(newVal, oldVal) {
      this.contextList = newVal == "head" ? contextMenu.head : contextMenu.row;
      console.log(newVal, oldVal, "新旧类型");
    },
  },
};
</script>
<style lang="scss" scoped>
.table-context-menu {
  position: fixed;
  width: 120px;
  // height: 100px;
  background: #fff;
  z-index: 12;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(51, 51, 51, 0.2);
  cursor: pointer;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      padding: 5px 8px;
      text-align: center;
      &:hover {
        background: rgba(239, 240, 240);
      }
    }
  }
}
</style>
