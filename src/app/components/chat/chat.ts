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
  maxLength = 150;
  errorMessage: string = '';
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
    // Limpiar mensaje de error previo
    this.errorMessage = '';
    
    if (this.newMessage.length > this.maxLength) {
      this.errorMessage = `El mensaje no puede exceder los ${this.maxLength} caracteres.`;
      
      // Cerrar mensaje luego de 3 segundos
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
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

  // Limpiar error cuando el usuario empiece a escribir
  onMessageInput() {
    if (this.errorMessage) {
      this.errorMessage = '';
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

}


