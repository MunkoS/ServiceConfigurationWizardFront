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
export class JournalConfigService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation journalConfigGet
   */
  static readonly JournalConfigGetPath = '/JournalConfig';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `journalConfigGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  journalConfigGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<ConfigInfo>> {

    const rb = new RequestBuilder(this.rootUrl, JournalConfigService.JournalConfigGetPath, 'get');
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
   * To access the full response (for headers, for example), `journalConfigGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  journalConfigGet$Plain(params?: {
  }): Observable<ConfigInfo> {

    return this.journalConfigGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<ConfigInfo>) => r.body as ConfigInfo)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `journalConfigGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  journalConfigGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<ConfigInfo>> {

    const rb = new RequestBuilder(this.rootUrl, JournalConfigService.JournalConfigGetPath, 'get');
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
   * To access the full response (for headers, for example), `journalConfigGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  journalConfigGet$Json(params?: {
  }): Observable<ConfigInfo> {

    return this.journalConfigGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<ConfigInfo>) => r.body as ConfigInfo)
    );
  }

  /**
   * Path part for operation journalConfigPatch
   */
  static readonly JournalConfigPatchPath = '/JournalConfig';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `journalConfigPatch$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  journalConfigPatch$Plain$Response(params?: {
    body?: ConfigInfo
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, JournalConfigService.JournalConfigPatchPath, 'patch');
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
   * To access the full response (for headers, for example), `journalConfigPatch$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  journalConfigPatch$Plain(params?: {
    body?: ConfigInfo
  }): Observable<boolean> {

    return this.journalConfigPatch$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `journalConfigPatch$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  journalConfigPatch$Json$Response(params?: {
    body?: ConfigInfo
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, JournalConfigService.JournalConfigPatchPath, 'patch');
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
   * To access the full response (for headers, for example), `journalConfigPatch$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  journalConfigPatch$Json(params?: {
    body?: ConfigInfo
  }): Observable<boolean> {

    return this.journalConfigPatch$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
