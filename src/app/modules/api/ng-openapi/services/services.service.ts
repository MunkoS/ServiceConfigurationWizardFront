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

import { ServicesName } from '../models/services-name';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation checkSericePost
   */
  static readonly CheckSericePostPath = '/checkSerice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkSericePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  checkSericePost$Plain$Response(params?: {
    serviceName?: ServicesName;
    hostName?: string;
    body?: Array<number>
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ServicesService.CheckSericePostPath, 'post');
    if (params) {
      rb.query('serviceName', params.serviceName, {});
      rb.query('hostName', params.hostName, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `checkSericePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  checkSericePost$Plain(params?: {
    serviceName?: ServicesName;
    hostName?: string;
    body?: Array<number>
  }): Observable<string> {

    return this.checkSericePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkSericePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  checkSericePost$Json$Response(params?: {
    serviceName?: ServicesName;
    hostName?: string;
    body?: Array<number>
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ServicesService.CheckSericePostPath, 'post');
    if (params) {
      rb.query('serviceName', params.serviceName, {});
      rb.query('hostName', params.hostName, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `checkSericePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  checkSericePost$Json(params?: {
    serviceName?: ServicesName;
    hostName?: string;
    body?: Array<number>
  }): Observable<string> {

    return this.checkSericePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation restartServiceGet
   */
  static readonly RestartServiceGetPath = '/restartService';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restartServiceGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  restartServiceGet$Plain$Response(params?: {
    service?: ServicesName;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ServicesService.RestartServiceGetPath, 'get');
    if (params) {
      rb.query('service', params.service, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `restartServiceGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  restartServiceGet$Plain(params?: {
    service?: ServicesName;
  }): Observable<string> {

    return this.restartServiceGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restartServiceGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  restartServiceGet$Json$Response(params?: {
    service?: ServicesName;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ServicesService.RestartServiceGetPath, 'get');
    if (params) {
      rb.query('service', params.service, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `restartServiceGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  restartServiceGet$Json(params?: {
    service?: ServicesName;
  }): Observable<string> {

    return this.restartServiceGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
