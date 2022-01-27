import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { faChevronRight, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { EMPTY, forkJoin, switchMap, tap } from 'rxjs';
import { ScadaService } from '../../services/scada.service';
import { SelectModel } from '../../../shared/select/models/select';
import { RoleDto } from '../../models/scada.service';

@Component({
  selector: 'app-scada-account-settings',
  templateUrl: './scada-account-settings.component.html',
  styleUrls: ['./scada-account-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScadaAccountSettingsComponent implements OnInit {
  private readonly _permissinDisp = 'Доступ к диспетчеру';
  private readonly _permissinEdit = 'Доступ к редактору';
  public nextButtonIcon = faChevronRight;
  public closeButtonIcon = faTimes;
  public eyeIcon = faEye;
  public slashEyeIcon = faEyeSlash;
  public dispUsers: SelectModel[] = [];
  public editUsers: SelectModel[] = [];
  @Output() public readonly confrimForm = new EventEmitter<FormGroup[]>();

  public checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public dispForm: FormGroup = new FormGroup(
    {
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      passEey: new FormControl(true),
      confirmPassEey: new FormControl(true),
      groupId: new FormControl('')
    },
    { validators: this.checkPasswords }
  );

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public graphForm: FormGroup = new FormGroup(
    {
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      passEey: new FormControl(true),
      confirmPassEey: new FormControl(true),
      groupId: new FormControl('')
    },
    { validators: this.checkPasswords }
  );

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private scadaService: ScadaService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.scadaService
      .authentication()
      .pipe(
        switchMap(() =>
          this.scadaService.getAllGroups().pipe(
            switchMap(allGroups =>
              this.scadaService.getAllRoles().pipe(
                switchMap(allRoles => {
                  const dispRol = allRoles.find(x => x.permissions?.find(perm => perm.permissionName === this._permissinDisp));
                  const editRole = allRoles.find(x => x.permissions?.find(perm => perm.permissionName === this._permissinEdit));

                  if (dispRol) {
                    const dispGroups = allGroups.filter(gr => gr.roles?.find(role => role.roleId === dispRol.roleId));

                    const dispUsers: any[] = [];
                    dispGroups.forEach(dGr => {
                      if (dispGroups[0]) {
                        this.dispForm.get('groupId')?.setValue(dispGroups[0].groupId);
                      }
                      if (dGr.users) {
                        dispUsers.push(
                          ...dGr.users.map(user => ({
                            value: user.name,
                            title: user.name,
                            id: user.userId
                          }))
                        );
                      }
                    });
                    this.dispUsers = dispUsers;
                  }

                  if (editRole) {
                    const editGroups = allGroups.filter(gr => gr.roles?.find(role => role.roleId === editRole.roleId));
                    if (editGroups[0]) {
                      this.graphForm.get('groupId')?.setValue(editGroups[0].groupId);
                    }
                    const editUsers: any[] = [];
                    editGroups.forEach(eGr => {
                      if (eGr.users) {
                        editUsers.push(
                          ...eGr.users.map(user => ({
                            value: user.name,
                            title: user.name,
                            id: user.userId
                          }))
                        );
                      }
                    });
                    this.editUsers = editUsers;
                  }

                  if (!this.graphForm.get('groupId')?.value || !this.dispForm.get('groupId')?.value) {
                    return this.scadaService.getAllPermission().pipe(
                      switchMap(permissions => {
                        const permissionEditId = permissions?.find(x => x.permissionName === this._permissinEdit)?.permissionId;
                        const permissionDispId = permissions?.find(x => x.permissionName === this._permissinDisp)?.permissionId;
                        if (permissionEditId && permissionDispId) {
                          return forkJoin([
                            this.scadaService.addAllRole({
                              roleName: this._permissinEdit,
                              permissionsIds: [permissionEditId]
                            }),
                            this.scadaService.addAllRole({
                              roleName: this._permissinDisp,
                              permissionsIds: [permissionDispId]
                            })
                          ]).pipe(
                            switchMap((res: RoleDto[]) => {
                              const permissionEditRole = res[0];
                              const permissionDispRole = res[1];
                              return forkJoin([
                                this.scadaService.addGroup({
                                  name: permissionEditRole.roleName,
                                  rolesIds: [permissionEditRole.roleId]
                                }),
                                this.scadaService.addGroup({
                                  name: permissionDispRole.roleName,
                                  rolesIds: [permissionDispRole.roleId]
                                })
                              ]).pipe(
                                tap(res => {
                                  this.graphForm.get('groupId')?.setValue(res[0].groupId);
                                  this.dispForm.get('groupId')?.setValue(res[1].groupId);
                                })
                              );
                            })
                          );
                        }

                        console.error(`Не нашли пермишины:${this._permissinEdit} ${this._permissinDisp}`);
                        return EMPTY;
                      })
                    );
                  }
                  return EMPTY;
                })
              )
            )
          )
        )
      )
      .subscribe();
  }

  public next(): void {
    this.confrimForm.emit([this.dispForm, this.graphForm]);
  }

  public back(): void {
    this.confrimForm.emit([]);
  }
}
