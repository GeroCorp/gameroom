import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { Popup } from './pages/mayor-menor/popup/popup';
import { Chat } from './components/chat/chat';
import { DirectivaDropdown } from './components/nav.component/directiva-dropdown';

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
    Popup,
    Chat,
    DirectivaDropdown
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
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
