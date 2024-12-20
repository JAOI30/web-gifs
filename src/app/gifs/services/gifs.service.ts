import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif, Images } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = '2du7cB6T1LMDpFqz20V5Tgrn2DAECCLx';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
   }
   

   constructor(private http: HttpClient) {

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    
    this.resultados = JSON.parse( localStorage.getItem('resultado')! ) || [];

    //if( localStorage.getItem('historial') ){
    //  this._historial = JSON.parse( localStorage.getItem('historial')! );
    //}

   }

   buscarGifs( query: string) {

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query)

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search?`, { params })
    .subscribe( ( resp ) => {
      this.resultados = resp.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultados));
    });
    
   }
}
