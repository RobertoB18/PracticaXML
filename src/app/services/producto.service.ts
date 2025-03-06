import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos : Producto[]=[
    new Producto(1, "Laptop", 1200, "../asset/laptop.jpg"),
    new Producto(2, "Mouse", 500, "../asset/mouse.jpg"),
    new Producto(3, "Teclado", 600, "../asset/teclado.jpg")
  ];
  obtenerProducto():Producto[]{
    return this.productos;
  }

  constructor() { }
}
