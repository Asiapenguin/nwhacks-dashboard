import { Injectable, OnDestroy } from '@angular/core';

const DISPLAY_ALERT_IN_MS = 3.5;

interface MsgQue {
  msg: string;
  type: 'show' | 'success' | 'error';
  mSeconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  queuedMessages: Array<MsgQue> = [];
  component: IAlertComponent;
  constructor() {}

  setComponent(component: IAlertComponent) {
    this.component = component;
    this.unloadQueues();
  }

  unsetComponent() {
    this.component = null;
  }

  show(msg: string, mSeconds: number = DISPLAY_ALERT_IN_MS) {
    if (this.component) {
      this.component.show(msg, mSeconds);
    } else {
      this.queue(msg, 'show', mSeconds);
    }
  }

  success(msg: string, mSeconds: number = DISPLAY_ALERT_IN_MS) {
    if (this.component) {
      this.component.success(msg, mSeconds);
    } else {
      this.queue(msg, 'success', mSeconds);
    }
  }

  error(msg: string, mSeconds: number = DISPLAY_ALERT_IN_MS) {
    if (this.component) {
      this.component.error(msg, mSeconds);
    } else {
      this.queue(msg, 'error', mSeconds);
    }
  }

  private unloadQueues() {
    const queuedMessages = this.queuedMessages;
    let currentSeconds = 0;
    for (let i = 0, len = queuedMessages.length; i < len; i++) {
      const queuedMsg = queuedMessages[i];
      setTimeout(() => {
        this[queuedMsg.type].call(this, queuedMsg.msg, queuedMsg.mSeconds);
      }, currentSeconds);
      currentSeconds += queuedMsg.mSeconds;
    }
    queuedMessages.length = 0;
  }

  // Used when you want to que messages until the next AlertComponent is set
  private queue(
    msg: string,
    type: 'show' | 'success' | 'error',
    mSeconds: number = DISPLAY_ALERT_IN_MS
  ) {
    this.queuedMessages.push({
      msg,
      type,
      mSeconds
    });
  }
}

/**
 * Each app that wants to use alert service should create the
 * alert component to its own liking and hook it to AlertService
 */
export interface IAlertComponent extends OnDestroy {
  show(msg: string, mSeconds: number);
  success(msg: string, mSeconds: number);
  error(msg: string, mSeconds: number);

  ngOnDestroy(): void;
}
