import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private card : Producto[] = [];
  agregarProducto(producto: Producto){
    const existente = this.card.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += producto.cantidad;
    } else {
      this.card.push(producto);
    }
  }

  obtenerProductos(){
    return this.card
  }
  constructor() { }
  eliminarProducto(producto: any){
    this.card.splice(producto, 1);
  }

  calcularSubtotal(){
    return this.card.reduce((suma, producto) => suma +producto.precio * producto.cantidad, 0)
  }
  calcularCantidad(){
    return this.card.reduce((suma, producto) => suma + producto.cantidad, 0);
  }
  generateXML():String{
    /*
    <?xml version="1.0" encoding="UTF-8"?>
<factura>
    <informacion>
        <folio>123</folio>
        <fecha>2025-05-06</fecha>
        <cliente>
            <nombre>Roberto</nombre>
            <email>roberto@email.com</email>
        </cliente>
    </informacion>
    
    <productos>
        <producto>
            <id>001</id>
            <descripcion>laptop</descripcion>
            <cantidad>1</cantidad>
            <precioUnitario>1299.99</precioUnitario>
            <subtotal>1299.99</subtotal>
        </producto>
    </productos>
    
    <totales>
        <subtotal>1299.99</subtotal>
        <impuestos>
            <iva>0.00</iva>
        </impuestos>
        <total>1299.99</total>
    </totales>
</factura>

    */
    let subtotal = this.calcularSubtotal().toFixed(2);
    let xml = `<?xml version="1.0" encoding="UTF-8"?> 
    <factura>
    <informacion>
        <folio>123</folio>
        <fecha>2025-03-06</fecha>
        <cliente>
            <nombre>Roberto</nombre>
            <email>roberto@email.com</email>
        </cliente>
    </informacion>

    <recibido> `
    
    this.card.forEach((producto) => {
      xml += `<producto id="${producto.id}">
      <nombre>${producto.nombre}</nombre> 
      <precio>${producto.precio}</precio>
      <cantidad>${producto.cantidad}</cantidad>
      </producto>`    
    });

    xml += `</recibido>
    <totales>
        <subtotal>${subtotal}</subtotal>
        <impuestos>
            <iva>0.00</iva>
        </impuestos>
        <total>${subtotal}</total>
    </totales>
    </factura>`;
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
