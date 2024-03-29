import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YardsComponent} from './yards.component';

describe('YardsComponent', () => {
  let component: YardsComponent;
  let fixture: ComponentFixture<YardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(YardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
