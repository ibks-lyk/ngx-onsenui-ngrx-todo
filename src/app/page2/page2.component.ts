import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { OnsNavigator, Params } from 'ngx-onsenui';
import * as ons from 'onsenui';

import * as TodoAction from '../core/actions/todo.action';
import * as TodoReducer from '../core/reducers/todo.reducer';
import { Todo } from '../interfaces';
import { Page3Component } from '../page3/page3.component';

@Component({
  selector: 'ons-page[page2]',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit, OnDestroy {
  todo: Todo;
  todo$: Observable<Todo>;
  loading$: Observable<boolean>;
  subscription: Subscription;

  /**
   * Constructor
   * @param store
   * @param navi
   * @param params
   */
  constructor(
    private store: Store<TodoReducer.State>,
    private navi: OnsNavigator,
    private params: Params,
  ) {
    this.todo$ = store.select(TodoReducer.getTodo);
    this.loading$ = store.select(TodoReducer.getLoading);
  }

  /**
   * Open action sheet
   */
  openActionSheet(todo: Todo) {
    ons.openActionSheet({
      cancelable: true,
      title: 'Do you want to delete this item ?',
      buttons: [
        { label: 'Delete', icon: 'md-delete', modifier: 'destructive' },
        { label: 'Cancel', icon: 'md-close' }
      ],
    }).then((i: number) => {
      switch (i) {
        case 0:
          this.delete(todo);
          break;
        default:
          break;
      }
    });
  }

  /**
   * Go to edit page
   * @param todo
   */
  edit(todo: Todo) {
    const params = {
      data: {
        todo
      },
      animation: 'lift'
    };
    this.navi.nativeElement.pushPage(Page3Component, params);
  }

  /**
   * Delete a ToDo
   * @param todo
   */
  delete(todo: Todo) {
    this.store.dispatch(new TodoAction.Delete(todo.id));
    this.navi.nativeElement.popPage();
  }

  /**
   * Initialize
   */
  ngOnInit() {
    this.todo = Object.assign({}, this.params.data.todo);
    this.store.dispatch(new TodoAction.Find(this.todo.id));
    this.subscription = this.todo$.subscribe(todo => this.todo = todo);
  }

  /**
   * Finalize
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
