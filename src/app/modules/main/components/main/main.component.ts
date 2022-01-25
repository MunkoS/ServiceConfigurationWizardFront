import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ServicesName } from '../../../api/ng-openapi/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  public dasUrl = `/dataAccessConfiguration/${ServicesName.DaService}`;
  public journalUrl = `/dataAccessConfiguration/${ServicesName.MirJournalService}`;
  public energyUrl = `/dataAccessConfiguration/${ServicesName.Energy}`;
}
