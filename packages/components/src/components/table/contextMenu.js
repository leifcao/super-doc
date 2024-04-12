import { generateId } from "@super-doc/api";

// 随机字符串
export function getRandomLetter(length) {
  var result = "";
  var randomIndex = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    // 首字符不是数字
    if (i === 0) {
      charactersLength = charactersLength - 10;
    }
    randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// 默认添加列操作
export function defaultAddColum(column, tableContext, item) {
  let key = getRandomLetter(7);
  let blockId = tableContext.$attrs["block-id"];
  let _data = tableContext.$blocks().find((f) => blockId == f.id).data;
  // let _data = getBlockData(tableContext.$attrs["block-id"]).data;
  _data.title.splice(column, 0, {
    value: "${datas[]." + key + "}",
    title: "新一列",
    key,
  });
  _data.table.PROXY_TARGET.forEach((item) => {
    item[key] = "-";
  });
  // 响应式问题处理
  tableContext.tableData.title = [];
  setTimeout(() => {
    tableContext.tableData.title = _data.title;
  });
}

// 默认添加行操作
export function defaultAddRow(tableContext, item, type = "up") {
  let blockId = tableContext.$attrs["block-id"];
  let _data = tableContext.$blocks().find((f) => blockId == f.id).data;
  let rowIndex = _data.table.findIndex(
    (f) => f.__id__ == tableContext.currentRow.__id__
  );
  let newRow = {};
  Object.keys(tableContext.currentRow).forEach((key) => {
    newRow[key] = key == "__id__" ? generateId() : "-";
  });
  let addIndex = type == "up" ? rowIndex : ++rowIndex;
  _data.table.splice(addIndex, 0, newRow);
}

export default {
  head: [
    {
      label: "向左插入一列",
      operation: "left",
      callBack: (tableContext, item) => {
        console.log("向左插入一列", tableContext);
        let column = tableContext.currentColumn;
        defaultAddColum(column, tableContext, item);
      },
    },
    {
      label: "向右插入一列",
      operation: "right",
      callBack: (tableContext, item) => {
        let column = tableContext.currentColumn;
        defaultAddColum(++column, tableContext, item);
      },
    },
    {
      label: "删除当前列",
      operation: "delete",
      callBack: (tableContext, item) => {
        let column = tableContext.currentColumn;
        let blockId = tableContext.$attrs["block-id"];
        let _data = tableContext.$blocks().find((f) => blockId == f.id).data;
        let columnObject = _data.title.splice(column, 1);
        console.log(columnObject, "columnObject");
        _data.table.PROXY_TARGET.forEach((item) => {
          delete item[`${columnObject[0].key}`];
        });
        tableContext.tableData.title = [];
        setTimeout(() => {
          tableContext.tableData.title = _data.title;
        });
      },
    },
  ],
  row: [
    {
      label: "向上插入一行",
      operation: "up-add",
      callBack: (tableContext, item) => {
        defaultAddRow(tableContext, item);
      },
    },
    {
      label: "向下插入一行",
      operation: "down-add",
      callBack: (tableContext, item) => {
        defaultAddRow(tableContext, item, "down");
      },
    },
    {
      label: "删除整行",
      operation: "delete",
      callBack: (tableContext, item) => {
        let blockId = tableContext.$attrs["block-id"];
        let _data = tableContext.$blocks().find((f) => blockId == f.id).data;
        let rowIndex = _data.table.findIndex(
          (f) => f.__id__ == tableContext.currentRow.__id__
        );
        _data.table.splice(rowIndex, 1);
      },
    },
  ],
};
