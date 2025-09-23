import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Soyyo } from './components/soyyo/soyyo';
import { Log } from './pages/log/log';
import { NavComponent } from './components/nav.component/nav.component';
import { Home } from './components/home/home';
import { Ahorcado } from './pages/ahorcado/ahorcado';
import { PopupEstado } from './pages/ahorcado/popup-estado/popup-estado';
import { MayorMenor } from './pages/mayor-menor/mayor-menor';
import { SalaChat } from './components/sala-chat/sala-chat';
import { Popup } from './pages/mayor-menor/popup/popup';

@NgModule({
  declarations: [
    App,
    Login,
    Register,
    Soyyo,
    Log,
    NavComponent,
    Home,
    Ahorcado,
    PopupEstado,
    MayorMenor,
    SalaChat,
    Popup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
