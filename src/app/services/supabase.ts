import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  
  private supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  
  session = signal<Session | null>(null);
  user = signal<User | null>(null);
  error = signal<string | null>(null);
  
  constructor(
    private router: Router
  ) {  
    // Cargar sesión al iniciar
    this.supabase.auth.getSession().then(({data}) => {
      this.session.set(data.session ?? null);
      this.user.set(data.session?.user ?? null);
    })
    // Escuchar cambios de sesión
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);
    });
  }

  

  async login(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      if (!data || !data.user) throw new Error('No se pudo obtener el usuario.');
      //Verificación de datos por consola
      console.log(data.user);
      this.router.navigate(['/']);

      return data; 
    } catch (err: any) {
      console.error('Error en login:', err);
      if (err.message.includes('Invalid login credentials')) {
        this.error.set('Correo electrónico o contraseña incorrectos.');
      }
      throw new Error(err.message);
    }
  }

  async register(email: string, password: string, name: string, surname: string, age: number) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email, 
        password,
        options:{
          data:{
            name: name,
            surname: surname,
            age: age
          }
        }
      });
      if (error) {
        this.error.set(error.message);
        throw new Error(error.message);
      }

      //Verificación de datos por consola
      console.log(data.user);
      this.router.navigate(['/']);

      return data; 
      
    } catch (err: any) {
      if (err.message.includes('User already registered')) {
        this.error.set('El correo electrónico ya está en uso.');
      }
      
      throw new Error(this.error.toString());
    }
  }

  async logout() {
    try {
      const { error } = await this.supabase.auth.signOut();
      this.session.set(null);
      this.user.set(null);
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error('Error en logout:', err);
      throw new Error('No se pudo cerrar sesión.');
    }
  }

  //Obtener los datos del usuario logueado
  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) throw new Error('No se pudo obtener el usuario actual.');
    return data.user;
  }

  async getCards(){
    const { data, error } = await this.supabase
      .from('cards')
      .select('*');
    if (error) throw new Error('No se pudieron obtener las cartas.');
    console.log(data);
    return data;
  }

  async getMessages(){
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .order('send_date', { ascending: true });
    if (error) throw new Error('No se pudieron obtener los mensajes.');
    console.log(data);
    return data;
  }

  async sendMessage(messageContent: string) {
    const { data: { user } } = await this.supabase.auth.getUser();

    if (user) {
      const { error } = await this.supabase
        .from('messages')
        .insert({
          content: messageContent,
          user_id: user.id,
          send_date: new Date().toISOString()
        });

      if (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  }
  async subscribeToMessages() {

    const channels = this.supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          console.log('Change received!', payload)
        }
      )
      .subscribe()

      return 
  }
  

}