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


@Injectable({
  providedIn: 'root',
})
export class DasServicesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation checkDasSericeGet
   */
  static readonly CheckDasSericeGetPath = '/checkDasSerice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkDasSericeGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkDasSericeGet$Plain$Response(params?: {
    hostName?: string;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, DasServicesService.CheckDasSericeGetPath, 'get');
    if (params) {
      rb.query('hostName', params.hostName, {});
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
   * To access the full response (for headers, for example), `checkDasSericeGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkDasSericeGet$Plain(params?: {
    hostName?: string;
  }): Observable<string> {

    return this.checkDasSericeGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkDasSericeGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkDasSericeGet$Json$Response(params?: {
    hostName?: string;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, DasServicesService.CheckDasSericeGetPath, 'get');
    if (params) {
      rb.query('hostName', params.hostName, {});
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
   * To access the full response (for headers, for example), `checkDasSericeGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkDasSericeGet$Json(params?: {
    hostName?: string;
  }): Observable<string> {

    return this.checkDasSericeGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation restartDasServiceGet
   */
  static readonly RestartDasServiceGetPath = '/restartDasService';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restartDasServiceGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  restartDasServiceGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, DasServicesService.RestartDasServiceGetPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `restartDasServiceGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  restartDasServiceGet$Plain(params?: {
  }): Observable<string> {

    return this.restartDasServiceGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restartDasServiceGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  restartDasServiceGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, DasServicesService.RestartDasServiceGetPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `restartDasServiceGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  restartDasServiceGet$Json(params?: {
  }): Observable<string> {

    return this.restartDasServiceGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
