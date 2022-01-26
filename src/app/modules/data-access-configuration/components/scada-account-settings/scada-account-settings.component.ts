import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { faChevronRight, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scada-account-settings',
  templateUrl: './scada-account-settings.component.html',
  styleUrls: ['./scada-account-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScadaAccountSettingsComponent {
  public nextButtonIcon = faChevronRight;
  public closeButtonIcon = faTimes;
  public eyeIcon = faEye;
  public slashEyeIcon = faEyeSlash;
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
      confirmPassEey: new FormControl(true)
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
      confirmPassEey: new FormControl(true)
    },
    { validators: this.checkPasswords }
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor() {
    // empty
  }

  public next(): void {
    this.confrimForm.emit([this.dispForm, this.graphForm]);
  }

  public back(): void {
    this.confrimForm.emit([]);
  }
}
