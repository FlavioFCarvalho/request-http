import { Component, OnInit } from "@angular/core";
import { CursosService } from "../cursos.service";
import { Curso } from "../curso";
import { Observable, empty, of, Subject } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AlertModalComponent } from "../../shared/alert-modal/alert-modal.component";
import { AlertModalService } from "../../shared/alert-modal.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cursos-lista",
  templateUrl: "./cursos-lista.component.html",
  styleUrls: ["./cursos-lista.component.scss"],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];

  // bsModalRef: BsModalRef;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    // private modalService: BsModalService) { }
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onEdit(id) {
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      // map(),
      // tap(),
      // switchMap(),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );

    // this.service.list()
    // .pipe(
    //   catchError(error => empty())
    // )
    // .subscribe(
    //   dados => {
    //     console.log(dados);
    //   }
    //   // ,error => console.error(error),
    //   // () => console.log('Obserservable completo!')
    // );
  }

  handleError() {
    this.alertService.showAlertDanger(
      "Erro ao carregar cursos. Tente novamente mais tarde."
    );
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
