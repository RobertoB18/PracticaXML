import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  producto: any[]=[]
  constructor(
    private productoService : ProductoService, 
    private carritoService: CarritoService,
    private router:Router
  ){}

  ngOnInit(): void {
    
    this.producto = this.productoService.obtenerProducto();
  }
  agregarCarrito(producto: any){
    
    this.carritoService.agregarProducto(producto)
  }
  irCarrito(){
    this.router.navigate(['/carrito']);
  }
}
