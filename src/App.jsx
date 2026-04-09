import React, { useState, useEffect } from "react";
import { generateCalendarDays, HOLIDAYS } from "./calendarUtils";
import "./App.css";

function App() {
  const [viewDate, setViewDate] = useState({ year: 2026, month: 3 });
  const [range, setRange] = useState({ start: null, end: null });
  const [isDark, setIsDark] = useState(false);

  const storageKey = `notes-${viewDate.month}-${viewDate.year}`;
  const [notes, setNotes] = useState(localStorage.getItem(storageKey) || "");
  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const { days, image } = generateCalendarDays(viewDate.year, viewDate.month);

  useEffect(() => {
    setNotes(localStorage.getItem(storageKey) || "");
  }, [viewDate, storageKey]);

  const handleDateClick = (day, isCurrent) => {
    if (!isCurrent) return;
    const ts = new Date(viewDate.year, viewDate.month, day).getTime();
    if (!range.start || (range.start && range.end))
      setRange({ start: ts, end: null });
    else
      setRange({
        start: Math.min(range.start, ts),
        end: Math.max(range.start, ts),
      });
  };

  return (
    <div className={`wall-env ${isDark ? "dark-theme" : ""}`}>
      <div className="spiral-binder">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="ring"></div>
        ))}
      </div>

      <div className="calendar-card">
        <div className="hero">
          <img src={image} alt="Month visual" />
          <div className="hero-content">
            <div className="year-box">
              <button
                onClick={() => setViewDate((p) => ({ ...p, year: p.year - 1 }))}
              >
                -
              </button>
              <h1>{viewDate.year}</h1>
              <button
                onClick={() => setViewDate((p) => ({ ...p, year: p.year + 1 }))}
              >
                +
              </button>
            </div>
            <h2 className="overlay-month">{monthNames[viewDate.month]}</h2>
          </div>
          <button className="theme-btn" onClick={() => setIsDark(!isDark)}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="calendar-body">
          <header className="body-header">
            <div className="nav">
              <button
                onClick={() =>
                  setViewDate((p) => ({ ...p, month: p.month - 1 }))
                }
              >
                ❮
              </button>
              <h3>{monthNames[viewDate.month]}</h3>
              <button
                onClick={() =>
                  setViewDate((p) => ({ ...p, month: p.month + 1 }))
                }
              >
                ❯
              </button>
            </div>
            <button
              className="reset-range"
              onClick={() => setRange({ start: null, end: null })}
            >
              Reset Range
            </button>
          </header>

          <div className="main-content">
            <aside className="memos-area">
              <label>MEMOS</label>
              <textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  localStorage.setItem(storageKey, e.target.value);
                }}
                placeholder="Monthly goals..."
              />
            </aside>

            <section className="grid-area">
              <div className="weekdays">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              <div className="days-grid">
                {days.map((d, i) => {
                  const ts = new Date(
                    viewDate.year,
                    viewDate.month,
                    d.day,
                  ).getTime();
                  const isSelected =
                    d.currentMonth && (range.start === ts || range.end === ts);
                  const inRange =
                    d.currentMonth &&
                    range.start &&
                    range.end &&
                    ts > range.start &&
                    ts < range.end;
                  const isHoliday =
                    d.currentMonth && HOLIDAYS[`${viewDate.month}-${d.day}`];
                  const isToday =
                    d.currentMonth &&
                    viewDate.year === 2026 &&
                    viewDate.month === 3 &&
                    d.day === 8;

                  return (
                    <div
                      key={i}
                      onClick={() => handleDateClick(d.day, d.currentMonth)}
                      className={`day ${d.currentMonth ? "active" : "faded"} ${isSelected ? "sel" : ""} ${inRange ? "range" : ""} ${isToday ? "today" : ""} ${isHoliday ? "holi" : ""}`}
                    >
                      {d.day}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
