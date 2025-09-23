import { Component, OnInit } from '@angular/core';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-sala-chat',
  standalone: false,
  templateUrl: './sala-chat.html',
  styleUrl: './sala-chat.css'
})
export class SalaChat implements OnInit {

  messages : any[] = [];
  newMessage: string = '';
  constructor(public supabase: Supabase) {}
  async ngOnInit(): Promise<void> {
    // Load initial messages from Supabase
    this.messages = await this.supabase.getMessages();

    // Detecta los cambios, falta implementar forma de actualizar "messages", con un observable?
    this.supabase.subscribeToMessages()

    console.log(this.messages);

  }


  async sendMessage() {
    const userId = (await this.supabase.getUser()).id;

    if (userId && this.newMessage.trim() !== '') {
      await this.supabase.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
  

}
