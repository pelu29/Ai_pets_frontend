import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  enviando = false;
  mensajeExito = false;
  mensajeError = false;

  enviarFormulario() {
    this.enviando = true;
    this.mensajeExito = false;
    this.mensajeError = false;

    // Simular envío de correo (en producción, necesitarías un backend)
    setTimeout(() => {
      try {
        // Aquí irían los datos del formulario
        console.log('Formulario enviado');
        this.mensajeExito = true;
        this.enviando = false;
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
          this.mensajeExito = false;
        }, 3000);
      } catch (error) {
        this.mensajeError = true;
        this.enviando = false;
      }
    }, 1500);
  }
}
