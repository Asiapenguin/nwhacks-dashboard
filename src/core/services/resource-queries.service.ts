import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resource } from '../models/resource';
import { ListResponse } from '../services/resource.service';

interface OrderBy {
  field: string;
  type: 'asc' | 'desc';
}

/**
 * Get Query Builder
 */
export class GetQuery<T extends Resource> {
  resourceId: number | string;
  getHandler: Function;
  onlyFields: Array<string> = [];
  limitResult: number;
  pageNumber: number;

  orderByFields: Array<OrderBy> = [];

  headers: { [key: string]: string | string[] } = {};

  constructor(getHandler: Function) {
    this.getHandler = getHandler;
  }

  id(id: number | string): GetQuery<T> {
    this.resourceId = id;
    return this;
  }

  only(...fields): GetQuery<T> {
    this.onlyFields = this.onlyFields.concat(...fields);
    return this;
  }

  limit(limitResult: number): GetQuery<T> {
    this.limitResult = limitResult;
    return this;
  }

  page(pageNumber: number): GetQuery<T> {
    this.pageNumber = pageNumber;
    return this;
  }

  orderBy(field: string, type: 'asc' | 'desc' = 'asc'): GetQuery<T> {
    this.orderByFields.push({ field, type });
    return this;
  }

  header(key: string, value: string | string[]): GetQuery<T> {
    this.headers[key] = value;
    return this;
  }

  fresh(): GetQuery<T> {
    this.headers['no-cache'] = '1';
    return this;
  }

  getHttpParams(): HttpParams {
    let params = new HttpParams();
    if (this.onlyFields.length) {
      params = params.set('only', this.onlyFields.join(','));
    }

    if (this.limitResult) {
      params = params.set('limit', this.limitResult.toString());
    }

    if (this.pageNumber) {
      params = params.set('page', this.pageNumber.toString());
    }

    if (this.orderByFields.length) {
      const orderByArray = [];
      for (const orderByField of this.orderByFields) {
        orderByArray.push([orderByField.field, orderByField.type]);
      }
      params = params.set('order', JSON.stringify(orderByArray));
    }
    return params;
  }

  getHttpHeaders(): HttpHeaders {
    const headers = this.headers;
    const keys = Object.keys(headers);
    if (keys.length) {
      let httpHeaders = new HttpHeaders();
      for (const key of keys) {
        httpHeaders = httpHeaders.set(key, headers[key].toString());
      }
      return httpHeaders;
    }
    return null;
  }

  get(): Promise<T | ListResponse<T>> {
    const params = this.getHttpParams();
    const headers = this.getHttpHeaders();
    if (this.resourceId) {
      return this.getHandler(this.resourceId, params, headers);
    }
    return this.getHandler(params, headers);
  }
}

/**
 * Search Param Interface
 */
interface SearchParam {
  field: string;
  value: string;
}

/**
 * Search Query Builder
 */
export class SearchQuery<T extends Resource> extends GetQuery<T> {
  searchParams: Array<SearchParam> = [];
  searchHandler: Function;

  constructor(
    field: string,
    value: number | string | Array<number | string>,
    searchHandler: Function
  ) {
    super(searchHandler);
    this.searchParams.push({
      field,
      value: value.toString()
    });
    this.searchHandler = searchHandler;
  }

  andWhere(field: string, value: number | string | Array<number | string>) {
    this.searchParams.push({
      field,
      value: value.toString()
    });
    return this;
  }

  fresh(): SearchQuery<T> {
    this.headers['no-cache'] = '1';
    return this;
  }

  get(): Promise<ListResponse<T>> {
    let params: HttpParams = this.getHttpParams();
    for (const searchParam of this.searchParams) {
      params = params.set(searchParam.field, searchParam.value);
    }

    return this.searchHandler(params, 'get', null, this.getHttpHeaders());
  }

  remove(): Promise<ListResponse<T>> {
    let params: HttpParams = this.getHttpParams();
    for (const searchParam of this.searchParams) {
      params = params.set(searchParam.field, searchParam.value);
    }
    return this.searchHandler(params, 'delete');
  }

  patch(resource: T): Promise<ListResponse<T>> {
    let params: HttpParams = this.getHttpParams();
    for (const searchParam of this.searchParams) {
      params = params.set(searchParam.field, searchParam.value);
    }
    return this.searchHandler(params, 'patch', resource);
  }
}
