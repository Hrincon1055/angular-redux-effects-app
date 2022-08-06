import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuarios.actions';
import { mergeMap, map, catchError, of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}
  cargarUsuarios$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      mergeMap(() =>
        this.usuarioService.getUsers().pipe(
          map((users: Usuario[]) =>
            usuariosActions.cargarUsuariosSuccess({ usuarios: users })
          ),
          catchError((error) =>
            of(
              usuariosActions.cargarUsuariosError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );
}
