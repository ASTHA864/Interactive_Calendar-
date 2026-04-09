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
      <div className="calendar-card">
        <div className="hero">
          <img src={image} alt="Month visual" />
          <div className="hero-overlay">
            <div className="year-nav">
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
          </div>
          <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="calendar-content">
          <header className="calendar-header">
            <div className="nav-wrapper">
              <button
                className="arrow"
                onClick={() =>
                  setViewDate((p) => ({ ...p, month: p.month - 1 }))
                }
              >
                ❮
              </button>
              <h2 className="visible-month">{monthNames[viewDate.month]}</h2>
              <button
                className="arrow"
                onClick={() =>
                  setViewDate((p) => ({ ...p, month: p.month + 1 }))
                }
              >
                ❯
              </button>
            </div>
            <button
              className="reset-btn"
              onClick={() => setRange({ start: null, end: null })}
            >
              Reset
            </button>
          </header>

          <div className="main-grid-layout">
            <aside className="notes-section">
              <label>MEMOS</label>
              <div className="notebook">
                <textarea
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    localStorage.setItem(storageKey, e.target.value);
                  }}
                  placeholder="Plan your month..."
                />
              </div>
            </aside>

            <section className="grid-section">
              <div className="days-header">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                  <div key={d} className="weekday">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid">
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

                  // Today's Logic: April 8, 2026
                  const isToday =
                    d.currentMonth &&
                    viewDate.year === 2026 &&
                    viewDate.month === 3 &&
                    d.day === 8;

                  return (
                    <div
                      key={i}
                      onClick={() => handleDateClick(d.day, d.currentMonth)}
                      className={`cell ${d.currentMonth ? "active" : "faded"} ${isSelected ? "selected" : ""} ${inRange ? "in-range" : ""} ${isToday ? "today" : ""}`}
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
