import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}
  cargarUsuario$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuario),
      mergeMap((action) =>
        this.usuarioService.getUserById(action.id).pipe(
          tap((dato) => console.log(dato)),
          map((user: Usuario) =>
            usuariosActions.cargarUsuarioSuccess({ usuario: user })
          ),
          catchError((error) =>
            of(
              usuariosActions.cargarUsuarioError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );
}
