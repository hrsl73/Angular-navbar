import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HomeComponent, 
    AboutComponent, 
    ContactComponent,
    RegisterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'navbar-app';
  searchQuery: string = '';
  darkMode: boolean = false;

  search() {
    console.log('Searching for:', this.searchQuery);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }
}
