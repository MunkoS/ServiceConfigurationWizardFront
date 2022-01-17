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

import { Databases } from '../models/databases';
import { GetDatabasesParams } from '../models/get-databases-params';

@Injectable({
  providedIn: 'root',
})
export class SqlService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDatabasesPost
   */
  static readonly GetDatabasesPostPath = '/getDatabases';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDatabasesPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  getDatabasesPost$Plain$Response(params?: {
    body?: GetDatabasesParams
  }): Observable<StrictHttpResponse<Array<Databases>>> {

    const rb = new RequestBuilder(this.rootUrl, SqlService.GetDatabasesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Databases>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDatabasesPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  getDatabasesPost$Plain(params?: {
    body?: GetDatabasesParams
  }): Observable<Array<Databases>> {

    return this.getDatabasesPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Databases>>) => r.body as Array<Databases>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDatabasesPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  getDatabasesPost$Json$Response(params?: {
    body?: GetDatabasesParams
  }): Observable<StrictHttpResponse<Array<Databases>>> {

    const rb = new RequestBuilder(this.rootUrl, SqlService.GetDatabasesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Databases>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDatabasesPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  getDatabasesPost$Json(params?: {
    body?: GetDatabasesParams
  }): Observable<Array<Databases>> {

    return this.getDatabasesPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Databases>>) => r.body as Array<Databases>)
    );
  }

  /**
   * Path part for operation getSqlConnectionsPost
   */
  static readonly GetSqlConnectionsPostPath = '/getSqlConnections';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSqlConnectionsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  getSqlConnectionsPost$Plain$Response(params?: {
    body?: GetDatabasesParams
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, SqlService.GetSqlConnectionsPostPath, 'post');
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
   * To access the full response (for headers, for example), `getSqlConnectionsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  getSqlConnectionsPost$Plain(params?: {
    body?: GetDatabasesParams
  }): Observable<boolean> {

    return this.getSqlConnectionsPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSqlConnectionsPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  getSqlConnectionsPost$Json$Response(params?: {
    body?: GetDatabasesParams
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, SqlService.GetSqlConnectionsPostPath, 'post');
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
   * To access the full response (for headers, for example), `getSqlConnectionsPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  getSqlConnectionsPost$Json(params?: {
    body?: GetDatabasesParams
  }): Observable<boolean> {

    return this.getSqlConnectionsPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
