import { Resource } from '../models/resource';

export abstract class SortablseFilterableComponent<T extends Resource> {
  /************************
   * Filtering
   ************************/
  searchString = '';
  filteredData: Array<T> = [];
  prevFilteredDataLengh = null;

  /************************
   * Sorting
   ************************/
  orderByField = 'id';
  isReversed = false;

  constructor() {}

  abstract getData(): Array<T>;

  /************************
   * Filtering
   ************************/
  filter() {
    const keyword = this.searchString.toLocaleLowerCase();
    this.filteredData = this.getData().filter(dataRow => {
      const isMatch = false;
      for (const prop in dataRow) {
        if (prop && this.isMatch(dataRow[prop], keyword)) {
          return true;
        }
      }

      return false;
    });

    this.prevFilteredDataLengh = this.filteredData.length;
  }

  /**
   * Check if an object matches keyword. Uses JSON.stringify for objects and use
   * indexOf (supposedly faster than RegExp)
   * @param prop Object's Property
   * @param keyword search keyword
   */
  private isMatch(prop: any, keyword: string) {
    const propType = typeof prop;
    if (propType === 'object') {
      prop = JSON.stringify(prop);
    } else if (propType !== 'string') {
      prop = prop.toString();
    }
    return prop.toLowerCase().indexOf(keyword) >= 0;
  }

  /************************
   * Sorting
   ************************/
  orderBy(field: string, isReversed = false) {
    if (field !== this.orderByField) {
      this.orderByField = field;
      this.isReversed = isReversed;
    } else {
      this.isReversed = !this.isReversed;
    }
    this.sort(this.getData(), field);
    this.sort(this.filteredData, field);
  }

  reorder() {
    this.sort(this.getData(), this.orderByField);
    this.sort(this.filteredData, this.orderByField);
  }

  private sort(data: Array<T>, field: string) {
    const isReversed = this.isReversed;
    data.sort((a, b) => {
      const fieldA = a[field];
      const fieldB = b[field];

      if (!fieldA && fieldB) {
        return isReversed ? 1 : -1;
      } else if (fieldA && !fieldB) {
        return isReversed ? -1 : 1;
      }

      if (fieldA < fieldB) {
        return isReversed ? 1 : -1;
      } else if (fieldA > fieldB) {
        return isReversed ? -1 : 1;
      }
      return 0;
    });
  }

  trackById(index: number, obj: T): number | string {
    return obj.id;
  }

  removeEntry(entry: T) {
    const data = this.getData();
    data.splice(data.indexOf(entry), 1);

    const indexInFilteredData = this.filteredData.indexOf(entry);
    if (indexInFilteredData >= 0) {
      this.filteredData.splice(indexInFilteredData, 1);
    }
  }
}
