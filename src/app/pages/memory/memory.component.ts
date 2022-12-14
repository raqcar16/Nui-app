import { Component, OnInit } from '@angular/core';
import { Carta } from '../../interface/carta';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
})
export class MemoryComponent implements OnInit {
  carta1: Carta = {
    silaba: 'La',
    seleccionada: false,
  };
  carta2: Carta = {
    silaba: 'Le',
    seleccionada: false,
  };
  carta3: Carta = {
    silaba: 'Li',
    seleccionada: false,
  };
  carta4: Carta = {
    silaba: 'Lo',
    seleccionada: false,
  };
  carta5: Carta = {
    silaba: 'Lu',
    seleccionada: false,
  };

  carta6: Carta = {
    silaba: 'La',
    seleccionada: false,
  };
  carta7: Carta = {
    silaba: 'Le',
    seleccionada: false,
  };
  carta8: Carta = {
    silaba: 'Li',
    seleccionada: false,
  };
  carta9: Carta = {
    silaba: 'Lo',
    seleccionada: false,
  };
  carta10: Carta = {
    silaba: 'Lu',
    seleccionada: false,
  };
  clicked = false;

  conjunto: Carta[] = [
    this.carta1,
    this.carta2,
    this.carta3,
    this.carta4,
    this.carta5,
    this.carta6,
    this.carta7,
    this.carta8,
    this.carta9,
    this.carta10,
  ];

  cartasSeleccionadas: Carta[] = [];

  constructor() {}

  async ngOnInit() {
    this.conjunto.sort(this.barajar);
  }

  barajar(a: any, b: any) {
    return 0.5 - Math.random();
  }
  clickCarta(carta: Carta) {
    if (carta.seleccionada === true) {
    } else {
      carta.seleccionada = true;
      this.cartasSeleccionadas.push(carta);
      if (this.cartasSeleccionadas.length === 2) {
        this.comparar();
      }
    }
  }

  comparar() {
    const carta1 = this.cartasSeleccionadas[0];
    const carta2 = this.cartasSeleccionadas[1];
    if (carta1.silaba === carta2.silaba) {
      window.alert('Correcto');
      this.cartasSeleccionadas = [];
    } else {
      this.cartasSeleccionadas[0].seleccionada = false;
      this.cartasSeleccionadas[1].seleccionada = false;
      this.cartasSeleccionadas = [];
      window.alert('Las cartas no coinciden');
    }
  }

  //MEMORY2 mayus minus
  /*
  async ordenar(conjunto: Carta[]) {
    for (let carta of conjunto) {
      carta.posicion = this.posicionAleatoria();
    }
    conjunto.sort((a, b) => a.posicion - b.posicion);
  }

  posicionAleatoria(): number {
    let aleatorio = Math.floor(Math.random() * this.posiciones.length);
    let posicion = this.posiciones[aleatorio];
    this.posiciones.splice(aleatorio, 1);
    return posicion;
  }
  */
}
