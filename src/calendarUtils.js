export const HOLIDAYS = {
  "0-1": "New Year's Day",
  "0-26": "Republic Day",
  "7-15": "Independence Day",
  "9-2": "Gandhi Jayanti",
  "11-25": "Christmas",
};

export const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const prevMonthDays = Array.from({ length: startWeekday }, (_, i) => ({
    day: prevMonthLastDay - (startWeekday - 1 - i),
    currentMonth: false,
  }));

  const currentMonthDays = Array.from(
    { length: lastDay.getDate() },
    (_, i) => ({
      day: i + 1,
      currentMonth: true,
    }),
  );

  const remaining = 35 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from(
    { length: remaining > 0 ? remaining : 0 },
    (_, i) => ({
      day: i + 1,
      currentMonth: false,
    }),
  );

  const monthImages = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1433086566547-06f076c83669?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1440778303588-435521a205bc?auto=format&fit=crop&w=1000",
    "https://images.unsplash.com/photo-1418063312181-0161780c0de0?auto=format&fit=crop&w=1000",
  ];

  return {
    days: [...prevMonthDays, ...currentMonthDays, ...nextMonthDays].slice(
      0,
      35,
    ),
    image: monthImages[month % 12],
  };
};
