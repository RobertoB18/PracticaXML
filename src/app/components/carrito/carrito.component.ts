import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';
import { PaypalButtonComponent } from "../paypal-button/paypal-button.component";

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, PaypalButtonComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito: any[] = []
  constructor(
    private carritoService:CarritoService
  ){}
  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerProductos()
  }
  eliminar(producto: any){
    this.carritoService.eliminarProducto(producto);
  }
  generarXML(){
    this.carritoService.generateXML()
  }
  
  total(): number {
    let total = 0;
    this.carrito.forEach((producto: Producto) => {
      console.log(producto.precio, producto.cantidad)
      total += producto.precio * producto.cantidad;
    });
    return total;
  }
}
