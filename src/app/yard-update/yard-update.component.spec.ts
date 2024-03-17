import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YardUpdateComponent} from './yard-update.component';

describe('YardPostComponent', () => {
  let component: YardUpdateComponent;
  let fixture: ComponentFixture<YardUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardUpdateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(YardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
