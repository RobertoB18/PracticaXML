import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
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
}
