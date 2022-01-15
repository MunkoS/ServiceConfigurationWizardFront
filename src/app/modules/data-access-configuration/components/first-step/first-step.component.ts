import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faBoxOpen, faWindowClose, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent {
  public boxIcon = faBoxOpen;
  public closeIcon = faWindowClose;
  public closeButtonIcon = faTimes;
  public checkButtonIcon = faCheck;
}
