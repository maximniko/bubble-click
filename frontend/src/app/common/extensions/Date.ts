export function toLocalDate(
  date: Date,
  locale: Intl.LocalesArgument,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  },
): string {
  return date.toLocaleDateString(locale, options)
}

export function toParamDate(date: Date): string {
  let month = String(date.getUTCMonth()),
    day = String(date.getUTCDate())
  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }

  return `${date.getFullYear()}-${month}-${day}`
}

export function getWeeksInMonth() {
  const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth(),
    weeks = [],
    firstDay = new Date(year, month, 1),
    lastDay = new Date(year, month + 1, 0),
    daysInMonth = lastDay.getDate()

  let start = 1;  // Неделя всегда начинается с первого дня месяца
  let dayOfWeek = firstDay.getDay() || 7;  // Приводим воскресенье (0) к 7

  for (let i = 1; i <= daysInMonth; i++) {
    // Если день недели воскресенье (7) или последний день месяца
    if (dayOfWeek === 7 || i === daysInMonth) {
      weeks.push({
        start: start,
        end: i
      });
      start = i + 1;  // Следующая неделя начинается с следующего дня
    }
    dayOfWeek = dayOfWeek % 7 + 1;  // Обновляем день недели
  }

  return weeks.length;
}

export function getDaysInMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  return new Date(year, month + 1, 0).getDate();
}
