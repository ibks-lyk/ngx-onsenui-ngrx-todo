import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as TodoAction from '../actions/todo.action';
import { TodoService } from '../services/todo.service';

/**
 * エフェクト
 */
@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {}

  /**
   * 一覧取得
   */
  @Effect() findAll$: Observable<Action> = this.actions$
    .ofType(TodoAction.FIND_ALL)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .findAll()
        .map(data => new TodoAction.FindAllSuccess(data.content))
        .catch(() => Observable.of(new TodoAction.FindAllFailed()))
    );

  /**
   * 一件取得
   */
  @Effect() find$: Observable<Action> = this.actions$
    .ofType(TodoAction.FIND)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .find(payload)
        .map(data => new TodoAction.FindSuccess(data))
        .catch(() => Observable.of(new TodoAction.FindFailed()))
    );

  /**
   * 登録
   */
  @Effect() create$: Observable<Action> = this.actions$
    .ofType(TodoAction.CREATE)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .create(payload)
        .map(data => new TodoAction.CreateSuccess(data))
        .catch(() => Observable.of(new TodoAction.CreateFailed()))
    );

  /**
   * 登録成功
   */
  @Effect() createSuccess$: Observable<Action> = this.actions$
    .ofType(TodoAction.CREATE_SUCCESS)
    .map(toPayload)
    .switchMap(payload =>
      Observable.of(new TodoAction.FindAll())
    );

  /**
   * 更新
   */
  @Effect() update$: Observable<Action> = this.actions$
    .ofType(TodoAction.UPDATE)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .update(payload)
        .map(data => new TodoAction.UpdateSuccess(data))
        .catch(() => Observable.of(new TodoAction.UpdateFailed()))
    );

  /**
   * 更新成功
   */
  @Effect() updateSuccess$: Observable<Action> = this.actions$
    .ofType(TodoAction.UPDATE_SUCCESS)
    .map(toPayload)
    .switchMap(payload =>
      Observable.of(new TodoAction.FindAll())
    );
  /**
   * 削除
   */
  @Effect() delete$: Observable<Action> = this.actions$
    .ofType(TodoAction.DELETE)
    .map(toPayload)
    .switchMap(payload =>
      this.todoService
        .delete(payload)
        .map(() => new TodoAction.DeleteSuccess(payload))
        .catch(() => Observable.of(new TodoAction.DeleteFailed()))
    );

  /**
   * 削除成功
   */
  @Effect() deleteSuccess$: Observable<Action> = this.actions$
    .ofType(TodoAction.DELETE_SUCCESS)
    .map(toPayload)
    .switchMap(payload =>
      Observable.of(new TodoAction.FindAll())
    );
}
