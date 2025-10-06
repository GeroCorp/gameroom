import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Supabase } from '../services/supabase';

export const guestGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(Supabase);
  const router = inject(Router);

  // Verificar si hay una sesión activa
  const session = supabaseService.session();
  const user = supabaseService.user();

  if (!session || !user) {
    // Usuario NO está autenticado, puede acceder a páginas de invitado
    return true;
  } else {
    // Usuario YA está autenticado, redirigir al home
    console.log('Usuario ya autenticado, redirigiendo al home...');
    router.navigate(['/']);
    return false;
  }
};