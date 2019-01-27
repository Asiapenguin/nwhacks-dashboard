import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AlertService, IAlertComponent } from '../../../core/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements IAlertComponent, OnDestroy {
  msg = '';
  type: 'success' | 'error';
  isVisible = false;
  @Output()
  alertVisibility = new EventEmitter();

  displayTimer: number;
  hideTimer: number;

  constructor(private alertService: AlertService) {
    alertService.setComponent(this);
  }

  ngOnDestroy() {
    this.alertService.unsetComponent();
  }

  show(msg: string, seconds: number) {
    this.msg = msg;
    this.display(seconds);
  }

  success(msg: string, seconds: number) {
    this.type = 'success';
    this.msg = msg;
    this.display(seconds);
  }

  error(msg: string, seconds: number) {
    this.type = 'error';
    this.msg = msg;
    this.display(seconds);
  }

  private display(seconds: number) {
    clearTimeout(this.displayTimer);
    this.displayTimer = setTimeout(() => {
      this.isVisible = true;
      this.alertVisibility.emit(true);

      clearTimeout(this.hideTimer);
    });
  }

  private reset() {
    this.type = null;
    this.msg = '';
    this.isVisible = false;
    this.alertVisibility.emit(false);
  }
}
