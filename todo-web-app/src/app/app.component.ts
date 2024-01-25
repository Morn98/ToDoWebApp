import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-web-app';

  showCompleted: boolean = false;

  newToDoEntry: string = '';
  openToDoEntries: string[] = [];
  doneToDoEntries: string[] = [];

  addToDoEntry() {
    if (this.newToDoEntry) {
      this.openToDoEntries.unshift(this.newToDoEntry);
      this.newToDoEntry = '';
    }
  }

  completeToDoEntry(toDoEntry: string) {
    const index = this.openToDoEntries.indexOf(toDoEntry);
    if (index !== -1) {
      this.doneToDoEntries.unshift(this.openToDoEntries[index]);
      this.openToDoEntries.splice(index, 1);
    }
  }

  moveToDoEntryToOpen(toDoEntry: string) {
    const index = this.doneToDoEntries.indexOf(toDoEntry);
    if (index !== -1) {
      this.openToDoEntries.unshift(this.doneToDoEntries[index]);
      this.doneToDoEntries.splice(index, 1);
    }
  }

  showCompletedToDos() {
    this.showCompleted = !this.showCompleted;
  }

  exportToDoEntries() {
    if (this.openToDoEntries.length > 0 || this.doneToDoEntries.length > 0) {
      const data = {
        openToDoEntries: this.openToDoEntries,
        doneToDoEntries: this.doneToDoEntries
      };
      const jsonData = JSON.stringify(data);

      const currentDate = new Date().toISOString().slice(0, 10);
      const fileprefix = 'todo';
      const filename = `${fileprefix}-${currentDate}.json`;

      this.downloadJson(jsonData, filename);
    }
  }

  importToDoEntries() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if ( fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const fileContent = fileReader.result as string;
        if (file.name.endsWith('.json')) {
          const data = JSON.parse(fileContent);
          this.openToDoEntries = data.openToDoEntries;
          this.doneToDoEntries = data.doneToDoEntries;
        } else {
          alert('Please select a JSON file');
        }
      };
      fileReader.readAsText(file);
    }
  }

  downloadJson(jsonData: string, filename: string) {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; 
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
