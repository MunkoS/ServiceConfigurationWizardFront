import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { sha512 } from 'js-sha512';
import {
  AuthUserRequest,
  AuthUserResult,
  GroupAddParams,
  GroupDto,
  IdentifyUserResult,
  PermissionDto,
  RoleAddParams,
  RoleDto,
  UserDto,
  UserSaveDto
} from '../models/scada.service';

@Injectable({
  providedIn: 'root'
})
export class ScadaService {
  private _baseLoginUrl = 'scadaLogin';
  private _baseAscUrl = 'scadaApi';
  private _token: string | undefined;
  constructor(private http: HttpClient) {}

  private HEX4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  private HEX8(): string {
    return this.HEX4() + this.HEX4();
  }

  private HEX16(): string {
    return this.HEX8() + this.HEX8();
  }

  public authentication(): Observable<AuthUserResult> {
    return this.http.post(`${this._baseLoginUrl}/Login/IdentifyUser?userName=miradmin`, {}).pipe(
      switchMap((res: IdentifyUserResult) => {
        const body: AuthUserRequest = {
          serverRandValue: res.serverRandValue,
          authPacket: sha512(`${res.serverRandValue}${sha512('mirpass')}`),
          clientInitSequence: this.HEX16()
        };

        return this.http.post<AuthUserResult>(`${this._baseLoginUrl}/Login/AuthUser`, body).pipe(
          tap(res => {
            this._token = res.jwt;
          })
        );
      })
    );
  }

  public getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this._baseAscUrl}/Users`);
  }

  public AddUsers(params: UserSaveDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this._baseAscUrl}/Users`, params);
  }

  public getAllGroups(): Observable<GroupDto[]> {
    return this.http.get<GroupDto[]>(`${this._baseAscUrl}/Groups`);
  }

  public addGroup(params: GroupAddParams): Observable<GroupDto> {
    return this.http.post<GroupDto>(`${this._baseAscUrl}/Groups/${params.name}`, params);
  }

  public getAllRoles(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(`${this._baseAscUrl}/Roles`);
  }

  public addAllRole(params: RoleAddParams): Observable<RoleDto> {
    return this.http.post<RoleDto>(`${this._baseAscUrl}/Roles`, params);
  }

  public getAllPermission(): Observable<PermissionDto[]> {
    return this.http.get<PermissionDto[]>(`${this._baseAscUrl}/Permissions`);
  }
}
