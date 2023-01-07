import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carta } from '../../interface/carta';
import { MemoryService } from '../../services/memory.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('descubierta', style({
        transform: 'rotateY(180deg)'
      })),
      transition('cubierta => descubierta', [
        animate('400ms')
      ]),
      transition('descubierta => cubierta', [
        animate('200ms')
      ])
    ])
  ]
})
export class MemoryComponent implements OnInit {

  clicked = false;
  conjunto: Carta[] = [];

  cartasSeleccionadas: Carta[] = [];
  silabas: string[]=[];
  nivel:any;
  constructor(private memoryService: MemoryService, private activatedRoute:ActivatedRoute) {}

  async ngOnInit() {
    this.nivel = this.activatedRoute.snapshot.paramMap.get('nivel');
    await this.getSilabas();
    this.conjunto.sort(this.barajar);
  }

  barajar() {
    return 0.5 - Math.random();
  }
  async clickCarta(carta: Carta) {
    if (carta.estado === 'descubierta') {
    } else {
      carta.estado = 'descubierta';
      this.cartasSeleccionadas.push(carta);
      if (this.cartasSeleccionadas.length === 2) {
        await this.sleep(500);
        this.comparar();
      }
    }
  }

 comparar() {
    const carta1 = this.cartasSeleccionadas[0];
    const carta2 = this.cartasSeleccionadas[1];
    if (carta1.silaba === carta2.silaba) {
      this.cartasSeleccionadas = [];
      let audio = new Audio();
      audio.src = "../../assets/sounds/check.mp3";
      audio.load();
      audio.play();
    } else {
      this.cartasSeleccionadas[0].estado = 'cubierta';
      this.cartasSeleccionadas[1].estado = 'cubierta';
      this.cartasSeleccionadas = [];
    }
  }

  async getSilabas(){
    this.silabas = await this.memoryService.getSilabas(this.nivel);
    for (let silaba of this.silabas){
      const carta: Carta = {
        silaba: silaba,
        estado: 'cubierta'
      }
      this.conjunto.push(carta)
    }
    for (let silaba of this.silabas){
      const carta: Carta = {
        silaba: silaba,
        estado: 'cubierta'
      }
      this.conjunto.push(carta)
    }

  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
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
