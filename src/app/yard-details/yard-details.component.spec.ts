import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YardDetailsComponent} from './yard-details.component';

describe('YardDetailsComponent', () => {
  let component: YardDetailsComponent;
  let fixture: ComponentFixture<YardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(YardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
