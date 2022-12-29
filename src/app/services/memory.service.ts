import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  constructor(private http: HttpClient) { }

  async getSilabas(nivel:string): Promise<string[]> {

    return new Promise(resolve => {
      this.http.get(`${URL}/memory/${nivel}`)
        .subscribe((resp:any) => {
          if (resp['ok']) {
            resolve(resp['silabas']);
          } else {
            resolve(['error']);
          }
        })
    });

  }
}
