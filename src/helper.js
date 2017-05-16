
class Helper {
  /**
   * Make Ajax request
   * @param {string} url
   * @param {string} method
   * @return {promise}
   */
  static ajax(url, method = 'GET') {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onreadystatechange = function (e) {
        if (this.readyState == 4) {
          this.status == 200 ? resolve(this.responseText) : reject();
        }
      };
      xhr.send();
    });
  }

  /**
   * Make array node from json object
   * @param {object} json
   * @param {number} maxRow
   * @return {HTMLTableElement}
   */
  static json2Table(json, sortRows = true, maxRows = 10) {
    const table = document.createElement('table');
    table.appendChild(Helper.getTableRow(['Key', 'Info', 'Type'], 'th'));
    let rows = [];
    for (let key in json) {
      let val = json[key];
      let type = Helper.getType(val);
      val = Helper.formatValue(val, type);
      rows.push({
        key: key,
        node: Helper.getTableRow([key, val, type])
      });
    }
    if (sortRows) {
      rows.sort((a, b) =>  a.key > b.key ? 1 : a.key < b.key ? -1 : 0);
    }
    if (maxRows) {
      rows = rows.slice(0, maxRows);
    }
    rows.forEach(row => table.appendChild(row.node));
    return table;
  }

  /**
   * Make a table row node
   * @param {string[]} items
   * @param {string} tag
   * @return {HTMLTableRowElement}
   */
  static getTableRow(items, tag = 'td') {
    let tr = document.createElement('tr');
    items.forEach(item => {
      let td = document.createElement(tag);
      td.innerText = item;
      tr.appendChild(td);
    });
    return tr;
  }

  /**
   * Get data type
   * @param {mixed} val
   * @return {string}
   */
  static getType(val) {
    let type = '?';
    if (typeof val === 'string' || val instanceof String) {
      type = 'string';
    } else if (Array.isArray(val)) {
      type = 'array';
    } else if (typeof val === 'object') {
      type = 'object';
    }
    return type;
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
