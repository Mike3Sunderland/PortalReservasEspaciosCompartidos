import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspaciosComponent } from './components/espacios/espacios.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ResenasComponent } from './components/resenas/resenas.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    EspaciosComponent,
    ReservasComponent,
    ResenasComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
