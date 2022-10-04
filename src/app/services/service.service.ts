import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from '../shared/general.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends GeneralService{
  
  private url = "http://127.0.0.1:8000/api/"
  
  constructor(private httpClient:HttpClient)  { 
    super(httpClient)
  }

  getProductos(){
    let endPoint = this.url +'productos'
    return this.metodoGet(endPoint);
  }

  crearProductos(producto){
    console.log(producto)
    let endPoint = this.url +'productos'
    return this.metodoPostApi(endPoint,producto)
  }

  public setImagen(body, id){
    let endPoint = this.url +'set_imagen'
    return this.metodoPostApi(`${endPoint}/${id}`, body)
  }

  actualizarProductos(body, id){
    let endPoint = this.url +'productos'
    return this.metodoPutApi(`${endPoint}/${id}`,body)
  }

  eliminarProducto(id){
    let endPoint = this.url +'productos/' + id
    return this.metodoDeleteApi(endPoint);
  }
}
