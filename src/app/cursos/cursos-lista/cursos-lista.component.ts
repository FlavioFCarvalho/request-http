import { Component, OnInit } from "@angular/core";
import { CursosService } from "./cursos.service";
import { Curso } from "../curso";
import { Observable, empty, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AlertModalComponent } from "../../shared/alert-modal/alert-modal.component";

@Component({
  selector: "app-cursos-lista",
  templateUrl: "./cursos-lista.component.html",
  styleUrls: ["./cursos-lista.component.css"],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  //  cursos: Curso[];

  bsModalRef: BsModalRef;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    //this.service.list().subscribe(dados => (this.cursos = dados));
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      //map(),
      //tap(),
      //switchMap(),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handlerError();
        return empty();
      })
    );
    /*
    this.service.list().pipe(
      catchError(error => empty()).subscribe(
        dados => {
          console.table(dados);
        }
        //error => console.error(error),
        //() => console.log("Observable completo!")
      )
    );
    */
  }
  handlerError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = "danger";
    this.bsModalRef.content.message =
      "Erro ao carregar cursos. Tente novamente mais tarde.";
  }
}
