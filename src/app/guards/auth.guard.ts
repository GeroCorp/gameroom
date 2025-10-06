import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Supabase } from '../services/supabase';

export const authGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(Supabase);
  const router = inject(Router);

  // Verificar si hay una sesión activa
  const session = supabaseService.session();
  const user = supabaseService.user();

  if (session && user) {
    // Usuario está autenticado
    return true;
  } else {
    // Usuario no está autenticado, redirigir al login
    console.log('Usuario no autenticado, redirigiendo al login...');
    router.navigate(['/']);
    return false;
  }
};