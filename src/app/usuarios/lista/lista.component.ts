import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [],
})
export class ListaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public loading: boolean = false;
  public error: any;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('usuarios').subscribe(({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });
    this.store.dispatch(cargarUsuarios());
    // this._usuarioService.getUsers().subscribe((usuarios) => {
    //   this.usuarios = usuarios;
    // });
  }
}
