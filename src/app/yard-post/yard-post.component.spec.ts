import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YardPostComponent} from './yard-post.component';

describe('YardPostComponent', () => {
  let component: YardPostComponent;
  let fixture: ComponentFixture<YardPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardPostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(YardPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
