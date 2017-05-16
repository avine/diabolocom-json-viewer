
import * as $ from 'jquery';

export default class Helper {
  /**
   * Make array node from json object
   * @param {object} json
   * @param {number} maxRow
   * @return {jQuery}
   */
  static json2Table(json, sortRows = true, maxRows = 10) {
    const $table = $('<table>').append(
      Helper.getTableRow(['Key', 'Info', 'Type'], 'th')
    );
    let rows = [];
    for (let key in json) {
      let val = json[key];
      let type = $.type(val);
      val = Helper.formatValue(val, type);
      rows.push({
        key: key,
        $element: Helper.getTableRow([key, val, type])
      });
    }
    if (sortRows) {
      rows.sort((a, b) =>  a.key > b.key ? 1 : a.key < b.key ? -1 : 0);
    }
    if (maxRows) {
      rows = rows.slice(0, maxRows);
    }
    rows.forEach(row => $table.append(row.$element));
    return $table;
  }

  /**
   * Make a table row node
   * @param {string[]} items
   * @param {string} tag
   * @return {HTMLTableRowElement}
   */
  static getTableRow(items, tag = 'td') {
    let $tr = $('<tr>');
    items.forEach(item => $(`<${tag}>`).text(item).appendTo($tr));
    return $tr;
  }

  /**
   * Format any value according to its type
   * @param {mixed} val
   * @param {string} type
   */
  static formatValue(val, type) {
    switch (type) {
        case 'string':
          return val.substr(0, 10) + (val.length > 10 ? '...' : '');

        case 'array':
          return val.length + (val.length === 1 ? ' item' : ' items');

        case 'object':
          let length = 0;
          for (let p in val) {
            length++;
          }
          return length + (length === 1 ? ' property' : ' properties');

        default:
          return '?';
      }
  }
}
