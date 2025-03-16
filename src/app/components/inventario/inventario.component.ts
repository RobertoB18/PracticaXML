import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto';
import { InventarioService } from '../../services/inventario.service';


@Component({
  selector: 'app-inventario',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})

export class InventarioComponent {
  productos$: Observable<Producto[]>; 
  nuevoProducto: Producto={id:0, nombre:"", precio:0, imagen:"", cantidad:1};

  constructor(public inventarioService: InventarioService){
    this.productos$ = this.inventarioService.productos$;
  }
  agregarProduct(){
    if(!this.nuevoProducto.nombre || this.nuevoProducto.precio <= 0){
      alert("Valio vrg scooby");
      return;
    }
    const nuevoProducto: Producto = {
      id:this.nuevoProducto.id,
      nombre: this.nuevoProducto.nombre,
      precio: this.nuevoProducto.precio,
      imagen: "",
      cantidad: 1,
    };
    this.inventarioService.setProducts(nuevoProducto);
    this.nuevoProducto = {id:0, nombre:"", precio:0, imagen:"", cantidad:0};
  }

  eliminarProduct(id:number){
    this.inventarioService.eliminarProduct(id);
  }

  descargarXML(){
    this.inventarioService.descargar();
  }

}
