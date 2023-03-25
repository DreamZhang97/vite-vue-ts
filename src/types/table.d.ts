/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-24 23:00:21
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-25 10:51:14
 */
export interface ITableColumnType {
  prop: string;
  type?: string;
  label: string;
  width: number | string;
  fixed?: string;
  sortable?: string;
  align?: string;
  showOverFlowTooltip?: boolean;
  render?: Function;
  slot?: string;
}

export interface ITableSort {
  prop: string;
  order: "ascending" | "descending";
  init?: any;
  silent?: any;
}

class Sort {
  props?;
  order?;
  constructor(props?, order?) {
    this.props = props;
    this.order = order;
  }
}
