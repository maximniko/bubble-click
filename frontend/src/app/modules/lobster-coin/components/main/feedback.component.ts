import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwaService} from "../../../../common/services/twa.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn btn-danger mb-3" (click)="twa.hapticFeedbackNotificationOccurred('error')">notificationOccurred error</button>
    <button class="btn btn-success mb-3" (click)="twa.hapticFeedbackNotificationOccurred('success')">notificationOccurred success</button>
    <button class="btn btn-warning mb-3" (click)="twa.hapticFeedbackNotificationOccurred('warning')">notificationOccurred warning</button>
    <button class="btn btn-secondary mb-3" (click)="twa.hapticFeedbackImpactOccurred('light')">ImpactOccurred light</button>
    <button class="btn btn-secondary mb-3" (click)="twa.hapticFeedbackImpactOccurred('medium')">ImpactOccurred medium</button>
    <button class="btn btn-secondary mb-3" (click)="twa.hapticFeedbackImpactOccurred('heavy')">ImpactOccurred heavy</button>
    <button class="btn btn-secondary mb-3" (click)="twa.hapticFeedbackImpactOccurred('rigid')">ImpactOccurred rigid</button>
    <button class="btn btn-secondary mb-3" (click)="twa.hapticFeedbackImpactOccurred('soft')">ImpactOccurred soft</button>
  `,
  host: {class: 'd-flex flex-column h-100'},
})
export class FeedbackComponent {
  constructor(
    protected twa: TwaService,
  ) {
  }
}
