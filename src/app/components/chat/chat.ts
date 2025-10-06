import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { Supabase } from '../../services/supabase';

type Msg = {content: string, username: string, send_date: string}

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {

  messages = signal<Msg[]>([]);
  loading = signal(false);
  newMessage: string = '';
  username: string = ''

  constructor(
    private supabase: Supabase,
  ) { }

  async ngOnInit() {
    this.setUsername();
    this.supabase.subscribeToMessages(this.messages);
    await this.loadMessages();
  }

  async loadMessages() {
    this.loading.set(true)
    try {
      
      const messagesReceived = await this.supabase.getMessages();
      this.messages.set(messagesReceived)

    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
    this.loading.set(false);
    // Hacer scroll al final después de cargar mensajes
    this.scrollToBottomSmooth();
  }

  
  async setUsername(){
    const user = await this.supabase.getUser()
    this.username = user?.user_metadata?.['name'];
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      const tempContent = this.newMessage;
      try {
        
        this.newMessage = '';
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
      } finally{
        await this.supabase.sendMessage(tempContent)
        this.scrollToBottom()
      }
    }
  }

  // Scroll post-carga
  private scrollToBottom(): void {
    setTimeout(() => {
      const container = document.getElementById('messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 400);
  }

  // Scroll suave para inicio
  private scrollToBottomSmooth(): void {
    requestAnimationFrame(() => {
      const container = document.getElementById('messages-container');
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    });
  }


  // verificar si la fecha del mensaje no es del mismo dia
  isNotToday(messageDate: string): boolean {
    if (!messageDate) return false;
    
    const msgDate = new Date(messageDate);
    const today = new Date();
    
    // Comparar solo año, mes y día
    return !(
      msgDate.getFullYear() === today.getFullYear() &&
      msgDate.getMonth() === today.getMonth() &&
      msgDate.getDate() === today.getDate()
    );
  }

  // Función para formatear la fecha cuando no es hoy
  formatMessageDate(messageDate: string): string {
    const msgDate = new Date(messageDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Si es ayer
    if (
      msgDate.getFullYear() === yesterday.getFullYear() &&
      msgDate.getMonth() === yesterday.getMonth() &&
      msgDate.getDate() === yesterday.getDate()
    ) {
      return 'Ayer';
    }

    // Si es de esta semana (últimos 7 días)
    const daysDiff = Math.floor((today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return days[msgDate.getDay()];
    }

    // Si es más antiguo
    return msgDate.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }
}


