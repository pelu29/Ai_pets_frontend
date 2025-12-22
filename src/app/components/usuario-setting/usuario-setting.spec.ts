import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSetting } from './usuario-setting';

describe('UsuarioSetting', () => {
  let component: UsuarioSetting;
  let fixture: ComponentFixture<UsuarioSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
