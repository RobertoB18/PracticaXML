import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();
  constructor( private productoService: ProductoService) { 
    this.cargarProduct()
  }
  cargarProduct(){
    this.productoService.obtenerProducto().subscribe(productos => {
      this.productosSubject.next(productos);
    });
  }
  
  getProducts():Producto[]{
    return this.productosSubject.getValue();
  }

  setProducts(producto: Producto){
    const nuevosProductos = [...this.getProducts(), producto];
    this.productosSubject.next(nuevosProductos);
    this.descargar();
  }
  eliminarProduct(id:number){
    const nuevosProductos = this.getProducts().filter(p => p.id !== id);
    this.productosSubject.next(nuevosProductos);
    this.descargar();
  }
  descargar() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<inventario>\n`;
    this.getProducts().forEach(p => {
      xml += `  <producto>\n`;
      xml += `    <id>${p.id}</id>\n`;
      xml += `    <nombre>${p.nombre}</nombre>\n`;
      xml += `    <precio>${p.precio}</precio>\n`;
      xml += `    <imagen>${p.imagen}</imagen>\n`;
      xml += `  </producto>\n`;
    });
    xml += `</inventario>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'inventario.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    localStorage.setItem('inventarioXML', xml);
  }

  createProduct(newProduct:{id:String; nombre: string; precio: string; imagen: string }){

  }
}


