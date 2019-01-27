import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { AlertService } from '../../../core/services/alert.service';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: AlertService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent]
    }).compileComponents();
  }));

  beforeEach(inject([AlertService], (_alertService_: AlertService) => {
    alertService = _alertService_;
    spyOn(alertService, 'setComponent').and.callFake(() => {});
    spyOn(alertService, 'unsetComponent').and.callFake(() => {});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and attach component to service', () => {
    expect(component).toBeTruthy();
    expect(alertService.setComponent).toHaveBeenCalledWith(component);
  });

  it('should unset component from alert service', () => {
    component.ngOnDestroy();
    expect(alertService.unsetComponent).toHaveBeenCalled();
  });

  it(
    'should handle show',
    fakeAsync(() => {
      let counter = 0;
      component.alertVisibility.subscribe(g => {
        if (!counter) {
          expect(g).toEqual(true);
        } else {
          expect(g).toEqual(false);
        }
        counter++;
      });
      component.show('hello', 3000);
      tick(500);
      expect(component.isVisible).toBe(true);
      tick(4000);
      expect(component.isVisible).toBe(false);
      expect(component.type).toBe(null);
      expect(component.msg).toBe('');
    })
  );
});
