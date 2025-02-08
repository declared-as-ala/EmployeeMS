// src/pages/timesheets/TimesheetCalendar.tsx
import { useEffect, useRef } from "react";
import { createCalendar, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";

interface ScheduleXEvent {
  id: any;
  title: string;
  start: string; // "YYYY-MM-DD HH:mm"
  end: string; // "YYYY-MM-DD HH:mm"
}

interface TimesheetCalendarProps {
  events: ScheduleXEvent[];
}

function TimesheetCalendar({ events }: TimesheetCalendarProps) {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    const calendar = createCalendar({
      views: [createViewMonthGrid()],
      events,
    });

    calendar.render(calendarRef.current);

    return () => {
      calendar.destroy();
    };
  }, [events]);

  return (
    <div
      ref={calendarRef}
      style={{
        width: "100%",
        height: "700px",
        maxHeight: "80vh",
        border: "1px solid #ccc",
        overflow: "auto",
      }}
    />
  );
}

export default TimesheetCalendar;
