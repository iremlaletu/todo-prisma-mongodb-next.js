export function formatDate(date: string | number | Date) {
    return new Date(date).toLocaleDateString('tr-TR', {
      weekday: 'short',  // Gün ismi (Pzt, Salı vs.)
      year: 'numeric',   // Yıl
      month: 'short',    // Ay ismi (Jan, Feb vs.)
      day: 'numeric',    // Gün numarası
    });
  }