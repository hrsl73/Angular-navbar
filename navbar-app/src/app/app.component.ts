import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet, HomeComponent, AboutComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'navbar-app';
  selectedPage: string = 'home'; // Default page
  searchQuery: string = '';
  darkMode: boolean = false;

  navigate(page: string) {
    this.selectedPage = page;
  }
  search() {
    console.log('Searching for:', this.searchQuery);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }
}
