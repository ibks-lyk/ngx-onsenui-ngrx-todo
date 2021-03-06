import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { OnsNavigator, Params } from 'ngx-onsenui';

import * as TodoAction from '../actions/todo/todo.action';
import * as fromTodo from '../reducers/todo/todo.reducer';
import { Todo } from '../models';
import { Page2Component } from '../page2/page2.component';
import { Page3Component } from '../page3/page3.component';

@Component({
  selector: 'ons-page[page1]',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  message = 'Pull down to refresh';
  todos$: Observable<Todo[]>;

  /**
   * Constructor
   * @param store
   * @param navi
   * @param params
   */
  constructor(
    private store: Store<fromTodo.State>,
    private navi: OnsNavigator,
    private params: Params,
  ) {}

  /**
   * Callback for 'action' event
   * @param
   */
  onAction($event) {
    this.load();
    $event.done();
  }

  /**
   * Callback for 'changestate' event
   * @param
   */
  onChangeState($event) {
    switch ($event.state) {
      case 'initial':
        this.message = 'Pull down to refresh';
        break;
      case 'preaction':
        this.message = 'Release to refresh';
        break;
      case 'action':
        this.message = 'Loading data...';
        break;
    }
  }

  /**
   * Load
   */
  load() {
    this.store.dispatch(new TodoAction.FindAll());
  }

  /**
   * Go to detail page
   * @param todo
   */
  detail(todo: Todo) {
    const params = {
      data: {
        todo
      }
    };
    this.navi.nativeElement.pushPage(Page2Component, params);
  }

  /**
   * Go to edit page
   */
  add() {
    const params = {
      data: {
        todo: new Todo(null, '')
      },
      animation: 'lift'
    };
    this.navi.nativeElement.pushPage(Page3Component, params);
  }

  /**
   * Initialize
   */
  ngOnInit() {
    this.todos$ = this.store.select(fromTodo.getTodos);
    this.load();
  }

}
