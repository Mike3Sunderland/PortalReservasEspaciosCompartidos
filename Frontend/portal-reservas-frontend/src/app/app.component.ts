import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mostrarNav = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verificarRuta(event.url);
      }
    });
  }

  ngOnInit(): void {}

  verificarRuta(url: string) {
    const rutasSinNav = ['/login', '/registro'];
    this.mostrarNav = !rutasSinNav.includes(url);
  }
}
