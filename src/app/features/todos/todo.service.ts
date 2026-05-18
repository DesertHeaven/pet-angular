import { computed, Injectable, signal } from '@angular/core';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly todos = signal<Todo[]>([]);

  readonly totalCount = computed(() => this.todos().length);
  readonly completedCount = computed(
    () => this.todos().filter((todo) => todo.completed).length,
  );

  addTodo(title: string): void {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    };

    this.todos.update((todos) => [...todos, todo]);
    console.log('[TodoService] Todo added', todo);
  }

  toggleTodo(id: number): void {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    console.log('[TodoService] Todo toggled', id);
  }

  removeTodo(id: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    console.log('[TodoService] Todo removed', id);
  }

  loadTodosFromApi(): void {
    const todos: Todo[] = [
      { id: 1, title: 'Learn Angular components', completed: false },
      { id: 2, title: 'Practice signals', completed: true },
      { id: 3, title: 'Build a todo service', completed: false },
    ];

    this.todos.set(todos);
    console.log('[TodoService] Todos loaded from mock API', todos);
  }
}
