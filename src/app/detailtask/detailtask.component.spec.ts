import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DetailtaskComponent } from './detailtask.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DetailtaskComponent', () => {
  let component: DetailtaskComponent;
  let fixture: ComponentFixture<DetailtaskComponent>;

  // Crear un objeto ActivatedRoute falso para usar en la prueba
  const fakeActivatedRoute = {
    snapshot: { paramMap: { get: () => '1' } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailtaskComponent],
      providers: [
        // Proporcionar el objeto ActivatedRoute falso en lugar del real
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        // Puedes agregar otros servicios que DetailtaskComponent necesite aquí
      ],
      imports: [
        // Agrega HttpClientModule, MatFormFieldModule, FormsModule y ReactiveFormsModule aquí
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule, // Importa el módulo de formularios reactivos
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
