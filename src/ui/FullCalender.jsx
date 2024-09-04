import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

export default function FullCalender() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[
        {
          title: `#445 - mahmoud gamal`,
          start: "2024-07-1",
          end: "2024-07-010"
        },
        { title: `#444 - mahmoud gamal`, start: "2024-07-11" },
        { title: `#434 - mahmoud gamal`, start: "2024-07-15" }
      ]}
      editable={true}
      eventDrop={(event) => {
        console.log("Event dropped:", event);
      }}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      }}
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List"
      }}
    />
  );
}
