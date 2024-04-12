import { Plugin } from "@super-doc/api";
export default class TableTool extends Plugin.ToolPluginBase {
  type = "TableDoc";
  text = "表格";
  icon = null;

  blockData = {
    type: this.type,
    data: {
      table: [
        {
          enName: "Taxableinformation",
          name: "应缴信息",
          description: "-",
          id: "05cOkDnN",
        },
        {
          enName: "Role",
          name: "角色",
          description: "-",
          id: "2lPmQ0HO",
        },
        {
          enName: "Authority",
          name: "权限",
          description: "-",
          id: "7hm6pr99",
        },
        {
          enName: "SettlementAccountInfo",
          name: "结算账户信息",
          description: "-",
          id: "AN0oELJG",
        },
        {
          enName: "Merchantcontract",
          name: "商户合约",
          description: "-",
          id: "dBmxm7aN",
        },
        {
          enName: "CustomerContract",
          name: "客户合约",
          description: "-",
          id: "e7PYF8ZN",
        },
        {
          enName: "Collect",
          name: "代收",
          description: "-",
          id: "epMNsvPj",
        },
        {
          enName: "TempAccountInformation",
          name: "暂存账户信息",
          description: "-",
          id: "heTQfdyD",
        },
        {
          enName: "MerchantContractApplicationForm",
          name: "商户合约申请单",
          description: "-",
          id: "Hh7DPJ3y",
        },
        {
          enName: "MerchantInformation",
          name: "商户信息",
          description: "-",
          id: "Ii0fOZ1S",
        },
        {
          enName: "CustomerContractApplicationForm",
          name: "客户合约申请单",
          description: "-",
          id: "LKYun9WI",
        },
        {
          enName: "Collectablerecordstatus",
          name: "代收记录状态",
          description: "-",
          id: "mmodB9uk",
        },
        {
          enName: "MerchantContract",
          name: "商户合约",
          description: "-",
          id: "NRDQosvs",
        },
        {
          enName: "Billpaymenthistory",
          name: "缴费记录",
          description: "-",
          id: "RyQTzPUu",
        },
        {
          enName: "Merchantsettlementaccountinfo",
          name: "商户结算账户信息",
          description: "-",
          id: "SGP2StmW",
        },
        {
          enName: "CustomerInformation",
          name: "客户信息",
          description: "-",
          id: "YH8guijP",
        },
        {
          enName: "User",
          name: "用户",
          description: "-",
          id: "zDtefAYX",
        },
      ],
      title: [
        {
          value: "${datas[].name}",
          title: "中文",
        },
        {
          value: "${datas[].enName}",
          title: "英文"
        },
        {
          value: "${datas[].description}",
          title: "业务含义"
        }
      ],
    },
    class: this.type,
  };

  constructor(options) {
    super(options);
    this.getIcon();
  }

  getIcon() {
    const div = document.createElement("div");
    div.textContent = "表格";
    return div;
  }

  genearteTableData({title,table}){
    return {
      class: this.type,
      type: this.type,
      data:{
        title,
        table: table.map(t=> {!t.__id__ && (t.__id__ = _.generateBlockId()); return t})
      }
    }
  }
  formatHeadKey(content){
   return content.split(".")[1].replace("}", "")
  }
  // str解析成blockData
  complieHTMLToBlockData(node,blockData){
    if(typeof node.innerHTML !== "undefined") {
      // 为了能够每个元素都能编辑，遍历元素追加内容
      let table = node.querySelector("table")
      let id = table.id
      let thead = table.querySelectorAll("thead th");
      let tbody = table.querySelectorAll("tbody tr");
      // 构建表头
      let titleArr = [...thead].reduce((arr, item)=>{
        arr.push({
          title:item.innerHTML,
          value:item.getAttribute("value")
        })
        return arr
      },[]);
      // 构建表体
      let tableArr = [...tbody].reduce((arr, item) =>{
        let tdObject = { __id__: item.id }
        item.childNodes.forEach((c=>{
          let key = c.getAttribute("key");
          tdObject[key] = c.innerHTML;
        }))
        arr.push(tdObject)
        return arr
      },[])
      let tableData = this.genearteTableData({title:titleArr, table: tableArr})
      tableData.id = id || _.generateBlockId();
      blockData.push(tableData)
    }
  }

  // 反解析成htmlstring
  deComplieBlockDataToHTML(block){
    // 表头key
    let keyList = [];
    let head = block.data.title.map((item)=>{
      keyList.push(this.formatHeadKey(item.value))
      return `<th value="${item.value}">${item.title}</th>`
    }).join('\r\n');
    let body = block.data.table.map(item=>{
      let tdList = keyList.map((key)=>{
        return `<td key="${key}">${item[key]}</td>`
      })
      return `<tr id="${item.__id__ || _.generateBlockId()}">${tdList}</tr>`
    }).join('\r\n')
    return `<div block-type="${this.type}"><table id="${block.id}"><thead><tr align="left">${head}</tr></thead><tbody>${body}</tbody></table></div>`
  }
}
