import { Component } from '@angular/core';
import { TaskTracker } from './components/task-tracker/task-tracker';

@Component({
  selector: 'app-root',
  imports: [TaskTracker],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
