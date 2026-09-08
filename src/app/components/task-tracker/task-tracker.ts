import { Component, computed, signal } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-tracker',
  imports: [],
  templateUrl: './task-tracker.html',
  styleUrl: './task-tracker.css',
})
export class TaskTracker {
  // Elenco task.
  tasks = signal<Task[]>([]);

  // Testo nuovo task.
  newTask = signal('');

  // Ordino i task mettendo prima quelle da fare e poi quelle completate. Tutt questo tramite l'uso di "pendingTasks" e "completedTasks" + filter.
  orderedTasks = computed(() => {
    const pendingTasks = this.tasks().filter((task) => !task.completed);
    const completedTasks = this.tasks().filter((task) => task.completed);

    return [...pendingTasks, ...completedTasks];
  });

  // Aggiorno il testo scritto nell'input.
  updateNewTask(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTask.set(input.value);
  }

  // Aggiungo un nuovo task.
  addTask() {
    const description = this.newTask().trim();

    // Se l'input è vuoto non aggiungo nulla.
    if (description === '') {
      return;
    }

    const task: Task = {
      id: Date.now(),
      description: description,
      completed: false,
    };

    this.tasks.update((tasks) => [...tasks, task]);
    this.newTask.set('');
  }

  // Cambio lo stato completato/non completato del task.
  toggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }

  // Elimino task.
  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
