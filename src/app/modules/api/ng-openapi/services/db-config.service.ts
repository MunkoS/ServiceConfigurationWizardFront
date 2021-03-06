/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ConfigInfo } from '../models/config-info';

@Injectable({
  providedIn: 'root',
})
export class DbConfigService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation dbConfigGet
   */
  static readonly DbConfigGetPath = '/DbConfig';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dbConfigGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  dbConfigGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<ConfigInfo>> {

    const rb = new RequestBuilder(this.rootUrl, DbConfigService.DbConfigGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConfigInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dbConfigGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dbConfigGet$Plain(params?: {
  }): Observable<ConfigInfo> {

    return this.dbConfigGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<ConfigInfo>) => r.body as ConfigInfo)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dbConfigGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  dbConfigGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<ConfigInfo>> {

    const rb = new RequestBuilder(this.rootUrl, DbConfigService.DbConfigGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConfigInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dbConfigGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dbConfigGet$Json(params?: {
  }): Observable<ConfigInfo> {

    return this.dbConfigGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<ConfigInfo>) => r.body as ConfigInfo)
    );
  }

  /**
   * Path part for operation dbConfigPatch
   */
  static readonly DbConfigPatchPath = '/DbConfig';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dbConfigPatch$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dbConfigPatch$Plain$Response(params?: {
    body?: ConfigInfo
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, DbConfigService.DbConfigPatchPath, 'patch');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dbConfigPatch$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dbConfigPatch$Plain(params?: {
    body?: ConfigInfo
  }): Observable<boolean> {

    return this.dbConfigPatch$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dbConfigPatch$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dbConfigPatch$Json$Response(params?: {
    body?: ConfigInfo
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, DbConfigService.DbConfigPatchPath, 'patch');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dbConfigPatch$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dbConfigPatch$Json(params?: {
    body?: ConfigInfo
  }): Observable<boolean> {

    return this.dbConfigPatch$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
