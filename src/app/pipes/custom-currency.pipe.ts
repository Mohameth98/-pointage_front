import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  pure: true
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value == null) return ''; // Gère les valeurs nulles ou indéfinies

    // Formate le nombre avec des espaces pour les milliers
    const formattedNumber = new Intl.NumberFormat('fr-FR').format(value);

    // Ajoute "CFA" à la fin
    return `${formattedNumber} CFA`;
  }
}
