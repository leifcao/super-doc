<template>
    <div @click="hiddenContextMenu(true)">
      <el-table
        :data="tableData.table"
        highlight-current-row
        border
        ref="table"
        style="width: 100%; margin-top: 20px"
        :span-method="arraySpanMethod"
        @header-click="tableHeadClick"
        @header-contextmenu="headerContextmenu"
        @row-contextmenu="rowContextmenu"
        @row-click="rowClick"
        :header-cell-class-name="cellClassName"
        :cell-class-name="cellClassName"
      >
        <el-table-column
          v-for="(item,index) in tableData.title"
          :key="item.__id__"
          :index="index"
          :prop="formatTitleVal(item.value)"
        >
          <template slot="header" slot-scope="scope">
             <SuperDocInput
              style="width: 100%;"
              contenteditable="true"
              :prop="formatTitleVal(item.value)"
              :content="item.title"
              :params="{scope: scope}"
              @contentChange="(changeScope) => headContentChange(changeScope,item)"
            />
          </template>
          <template slot-scope="scope">
            <SuperDocInput
              style="width: 100%;"
              contenteditable="true"
              :content="scope.row[formatTitleVal(item.value)]"
              :params="{scope: scope}"
              :cellKey="formatTitleVal(item.value)"
              @contentChange="contentChange"
              @keydown="(event) => tableKeyDonwEvent(event,scope)"
            />
          </template>
        </el-table-column>
      </el-table>
      <contextMenu  @contextClick="contextClick"  :type="contextType"/>
    </div>
</template>
  
<script>
    
import { generateId, getBlockData } from "@super-doc/api";
import SuperDocInput from '../../common/input.vue';
// import Cell from './cell.vue';

import contextMenu from './contextMenu.vue'

export default {
  data() {
    return {
      tableData: {table: [], title: []},
      uuid: generateId(),
      coords: [],
      hiddens: [],
      merges: [],
      currentColumn: null,
      contextType: "head",
      currentRow: null,
    }
  },
  components: {
    SuperDocInput,
    contextMenu
  //   Cell
  },
  methods: {
    init() {
      const _data = getBlockData(this.$attrs["block-id"]).data;
      _data.table.forEach(d => {
        d.PROXY_TARGET.__id__ = generateId();
      });
      
      this.tableData = {table: _data.table, title: _data.title};
      _data.mergeInfo?.forEach(item => {
        this.coords.push(item.coord);
        this.merges.push(item.merge);
        this.hiddens.push(...item.hidden);
      })
    },
    formatTitleVal(content) {
      return content.split(".")[1].replace("}", ""); 
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      let merge = null;
      this.coords.some((coord, idx) => {
        const [r, c] = coord;
        const [mr, mc] = this.merges[idx]
        if(rowIndex === r && columnIndex === c) {
          merge = [mr, mc];
          return true;
        }
      })
      if(merge) return merge;

      let hidden = null; 
      this.hiddens.some(([ hr, hc ]) => {
        if(rowIndex === hr && columnIndex === hc) {
          hidden = [0, 0];
          return true;
        }
      });
      if(hidden) return [0, 0];
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    contentChange({content, params}) {
      const propName = params.scope.column.property;
      console.log(content,'yyjs')
      params.scope.row[propName] = content;
    },
    // 头部数据变更
    headContentChange({content, params},item){
        const propName = params.scope.column.property;
        item.title = content
    },
    getRandomLetter(length) {
      var result = '';
      var randomIndex = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          // 首字符不是数字
        if (i === 0) {
          charactersLength = charactersLength - 10
        } 
        randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
      }
      return result;
    },
    tableHeadClick(column, event){
      this.hiddenContextMenu()
      this.currentColumn = column.index;
      this.$refs.table.setCurrentRow()
    },
    headerContextmenu(column, event){
      this.hiddenContextMenu();
      this.$refs.table.setCurrentRow();
      this.currentColumn = column.index;
      this.showContextMenu("head");    
    },
    showContextMenu(type){
      this.contextType = type
      let contextMenu = this.$el.querySelector('.table-context-menu');
      contextMenu.__vue__.contextMenuDisplay = true;
      contextMenu.style.left = event.clientX + 'px';
      contextMenu.style.top = event.clientY + 'px';
      event.stopPropagation()
      event.preventDefault()
    },
    rowContextmenu(row, column, event){
      console.log('lfjs:右键')
      this.hiddenContextMenu()
      this.currentColumn = null;
      this.currentRow = row;
      this.$refs.table.setCurrentRow(row)
      this.showContextMenu("row")
      event.preventDefault()
    },
    rowClick(row, column, event){
      this.hiddenContextMenu()
      this.currentColumn = null;
      this.currentRow = row;
    },
    // 菜单点击事件
    contextClick(item){
      item.callBack(this,item);
      this.hiddenContextMenu()
      return
      let column = this.currentColumn
      if(item.operation == 'right'){
        column++
      }
      let key = this.getRandomLetter(7);
      
      //this.tableData.table.forEach(item=>{
      //  item[key] = ""
      //})
      let _data = getBlockData(this.$attrs["block-id"]).data;
        _data.title.splice(column, 0, {
        value: "${datas[]." + key + "}",
        title: "新一列",
      })
      _data.table.PROXY_TARGET.forEach(item=>{
        item[key] = "-"
      })
      // 响应式问题处理
      this.tableData.title = []
      setTimeout(()=>{
          this.tableData.title = _data.title
      })
      this.hiddenContextMenu()
    },
    cellClassName({row, column, rowIndex, columnIndex}){
      if(columnIndex == this.currentColumn) return 'clickColumnBg'
      return 'default'
    },
    // 表格键盘点击事件
    tableKeyDonwEvent(event,scope){
      this.hiddenContextMenu();
      this.currentColumn = null;
      if (event.keyCode === 13 || event.key == 'Enter') {
        const { $index , row} = scope
        console.log('yyjs:event',event,scope)
        let newRow = Object.create({})
        Object.keys(row).forEach(key =>{
          newRow[key] = key== '__id__' ? generateId() :"-"
        })
        this.tableData.table.splice($index+1 , 0,newRow)
        //debugger
        console.log(this.tableData.table,'yyjs:33table',newRow)
        
        event.preventDefault();
        event.stopPropagation();
      }
    },
    // 隐藏右键菜单
    hiddenContextMenu(){
      try{
        let contextMenuList = document.querySelectorAll('.table-context-menu')
        contextMenuList.forEach((item)=>{
          item.__vue__.contextMenuDisplay = false
        })
      }catch(e){
        console.log(`table:隐藏菜单失败`,e)
      }
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
  .clickColumnBg{
    background: rgba(229, 243, 255,1) !important;
  }
</style>
  