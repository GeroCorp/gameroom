import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearTiempo',
  standalone: false
})
export class FormatearTiempoPipe implements PipeTransform {

  transform(value: string | Date | null): string {
    if (!value) return '';
    
    const fecha = new Date(value);
    const ahora = new Date();
    
    // Resetear las horas para comparar solo fechas
    const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    const ahoraSinHora = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    
    const diferenciaEnMs = ahoraSinHora.getTime() - fechaSinHora.getTime();
    const diferenciaEnDias = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24));
    
    // Formatear hora HH:mm
    const formatearHora = (fecha: Date): string => {
      return fecha.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
    };
    
    // 1. Si es el mismo día: solo HH:mm
    if (diferenciaEnDias === 0) {
      return formatearHora(fecha);
    }
    
    // 2. Si es dentro de los últimos 7 días: día y HH:mm
    if (diferenciaEnDias > 0 && diferenciaEnDias <= 7) {
      const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
      const nombreDiaCapitalizado = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);
      return `${nombreDiaCapitalizado} ${formatearHora(fecha)}`;
    }
    
    // 3. Más de 7 días: día - mes (abreviado) - HH:mm
    const dia = fecha.getDate();
    const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
                  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const mesAbreviado = meses[fecha.getMonth()];
    
    return `${dia} - ${mesAbreviado} - ${formatearHora(fecha)}`;
  }

}
