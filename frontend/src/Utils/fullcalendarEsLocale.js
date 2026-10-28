/**
 * Locale "es" de FullCalendar v5 como módulo ESM local.
 *
 * El archivo original (@fullcalendar/core/locales/es.js) es CommonJS.
 * Si se excluye FullCalendar de optimizeDeps para conservar su singleton,
 * Vite sirve ese archivo tal cual y el import default falla. Este módulo
 * evita el problema sin cambiar la configuración global de FullCalendar.
 */
const esLocale = {
  code: 'es',
  week: {
    dow: 1,
    doy: 4,
  },
  buttonText: {
    prev: 'Ant',
    next: 'Sig',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    list: 'Agenda',
  },
  buttonHints: {
    prev: '$0 antes',
    next: '$0 siguiente',
    today: (buttonText) =>
      buttonText === 'Día'
        ? 'Hoy'
        : (buttonText === 'Semana' ? 'Esta' : 'Este') +
          ' ' +
          buttonText.toLocaleLowerCase(),
  },
  viewHint: (buttonText) =>
    'Vista ' +
    (buttonText === 'Semana' ? 'de la' : 'del') +
    ' ' +
    buttonText.toLocaleLowerCase(),
  weekText: 'Sm',
  weekTextLong: 'Semana',
  allDayText: 'Todo el día',
  moreLinkText: 'más',
  moreLinkHint: (eventCnt) => `Mostrar ${eventCnt} eventos más`,
  noEventsText: 'No hay eventos para mostrar',
  navLinkHint: 'Ir al $0',
  closeHint: 'Cerrar',
  timeHint: 'La hora',
  eventHint: 'Evento',
};

export default esLocale;
