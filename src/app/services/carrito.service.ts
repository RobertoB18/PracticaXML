import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private card : Producto[] = [];
  agregarProducto(producto: Producto){
    this.card.push(producto)
  }

  obtenerProductos(){
    return this.card
  }
  constructor() { }
  eliminarProducto(producto: any){
    this.card.splice(producto, 1);
  }
  generateXML():String{
    let xml = `<?xml version="1.0" encoding="UTF-8"git remote add origin https://github.com/NOMBRE_USUARIO/NOMBRE_PROYECTO.git?> 
    <recibido> `
    this.card.forEach((producto) => {
      xml += `<producto id="${producto.id}">
      <nombre>${producto.nombre}</nombre> 
      </producto>`    
    });
    xml += `</recibido>`;
    const blob = new Blob([xml], {type:'aapplication/json'})
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url
    a.download = "recibido.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return xml;
  }
}
