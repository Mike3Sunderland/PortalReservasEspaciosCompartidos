import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {
  isAuthenticated: boolean = false;
  isLoading: boolean = true;

  constructor(private router: Router) {
    
  }
  ngOnInit(): void {
      this.checkAuthStatus();

      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthStatus();
      });
  }
  
  checkAuthStatus(): void {
    this.isAuthenticated = !!localStorage.getItem('authToken');
    this.isLoading = false;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }
}
