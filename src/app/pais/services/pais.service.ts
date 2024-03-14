import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  get httpParams() {
    return new HttpParams().set( 'fields', 'name,capital,alpha2Code,flags,population,cca2' )
  }

  constructor( private http: HttpClient ) { }

  private getPaisesPeticion( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url, { params: this.httpParams } )
    .pipe(
      delay( 2000 )
    )
  }

  buscarPais(termino:string): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ termino }`;
    return this.getPaisesPeticion( url );
  }

  buscarCapital(termino:string): Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ termino }`;
    return this.getPaisesPeticion( url );
  }
  
  getPaisPorAlpha( id: string ): Observable<Country>{
    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this.http.get<Country>( url );
  }

  buscarRegion( region: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getPaisesPeticion( url )
  }

}
