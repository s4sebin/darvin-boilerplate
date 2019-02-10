/**
 * Filter items by given category
 *
 * @param {ExpandableTile[]} items
 * @param {CategoryFilter|null} filter
 * @return {ExpandableTile[]}
 */
export function filterItems(items, filterArr, searchString) {
  if(!filterArr) {
    return items;
  }

  let filteredObj = {};

  filterArr.forEach((filter) => {
    filteredObj[filter] = items[filter];
  });

  if(searchString!="") {
    let searchStringObj = {};
    Object.keys(filteredObj).forEach((cat) => {
      filteredObj[cat].forEach((catObj) => {
        if(catObj.name.includes(searchString)) {
          // match searchstring
          if(!searchStringObj[cat]) {
            searchStringObj[cat] = [];
          }
          searchStringObj[cat].push(catObj);
        }
      });
    });

    return searchStringObj;
  }

  return filteredObj;
}
