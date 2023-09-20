import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskFormDialogComponent } from './edit-task-form-dialog.component';

describe('EditTaskFormDialogComponent', () => {
  let component: EditTaskFormDialogComponent;
  let fixture: ComponentFixture<EditTaskFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskFormDialogComponent]
    });
    fixture = TestBed.createComponent(EditTaskFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
