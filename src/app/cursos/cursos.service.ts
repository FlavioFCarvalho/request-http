import { environment } from "../../environments/environment";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Curso } from "./curso";
import { tap, delay, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API).pipe(
      delay(2000),
      tap(console.table)
    );
  }

  loadByID(id) {
    //pipe(take1) Pq eu só quero ir no servidor apenas uma vez, sem repetir o request

    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }
}
