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
export class DispatcherConfigService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation dispatcherConfigGet
   */
  static readonly DispatcherConfigGetPath = '/DispatcherConfig';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dispatcherConfigGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  dispatcherConfigGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<ConfigInfo>> {

    const rb = new RequestBuilder(this.rootUrl, DispatcherConfigService.DispatcherConfigGetPath, 'get');
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
   * To access the full response (for headers, for example), `dispatcherConfigGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dispatcherConfigGet$Plain(params?: {
  }): Observable<ConfigInfo> {

    return this.dispatcherConfigGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<ConfigInfo>) => r.body as ConfigInfo)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dispatcherConfigGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  dispatcherConfigGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<ConfigInfo>> {

    const rb = new RequestBuilder(this.rootUrl, DispatcherConfigService.DispatcherConfigGetPath, 'get');
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
   * To access the full response (for headers, for example), `dispatcherConfigGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dispatcherConfigGet$Json(params?: {
  }): Observable<ConfigInfo> {

    return this.dispatcherConfigGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<ConfigInfo>) => r.body as ConfigInfo)
    );
  }

  /**
   * Path part for operation dispatcherConfigPatch
   */
  static readonly DispatcherConfigPatchPath = '/DispatcherConfig';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dispatcherConfigPatch$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dispatcherConfigPatch$Plain$Response(params?: {
    body?: ConfigInfo
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, DispatcherConfigService.DispatcherConfigPatchPath, 'patch');
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
   * To access the full response (for headers, for example), `dispatcherConfigPatch$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dispatcherConfigPatch$Plain(params?: {
    body?: ConfigInfo
  }): Observable<boolean> {

    return this.dispatcherConfigPatch$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dispatcherConfigPatch$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dispatcherConfigPatch$Json$Response(params?: {
    body?: ConfigInfo
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, DispatcherConfigService.DispatcherConfigPatchPath, 'patch');
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
   * To access the full response (for headers, for example), `dispatcherConfigPatch$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dispatcherConfigPatch$Json(params?: {
    body?: ConfigInfo
  }): Observable<boolean> {

    return this.dispatcherConfigPatch$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
