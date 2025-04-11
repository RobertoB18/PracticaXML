import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //private  xmlUrl = "assets/productos.xml"
  private apiUrl = "http://localhost:3000/api/productos"; // URL de la API REST
  constructor(private http:HttpClient){
  }

  obtenerProducto(): Observable<any[]> {
    
   return this.http.get<any[]>(this.apiUrl);
  }

  private parseXML(xml: string): any[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    return Array.from(xmlDoc.getElementsByTagName("producto")).map(prod => ({
      id: Number(prod.getElementsByTagName("id")[0].textContent), // Convertir a número
      nombre: prod.getElementsByTagName("nombre")[0].textContent || "",
      precio: Number(prod.getElementsByTagName("precio")[0].textContent), // Convertir a número
      imagen: prod.getElementsByTagName("imagen")[0].textContent || "",
    }));
  } 
}


//Consulta y actualizacion de componentes en angular **OBJETIVO**