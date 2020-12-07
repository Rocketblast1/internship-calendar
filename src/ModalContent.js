import React, { useState } from "react";

export const ModalContent = (props) => {
  const { eventDate, startTime, maxTime, onEventDataChange, hour, day } = props;
  const [eventData, seteventData] = useState({
    eventName: "",
    eventStartTime: startTime,
    eventEndTime: "",
    eventDate: eventDate,
    hour: hour,
    day: day
  });
  const { eventName, eventStartTime, eventEndTime } = eventData;
  const handleChange = () => {
    setTimeout(() => {
      onEventDataChange(eventData);
    }, 1000);
  };
  const handleName = (e) => {
    const data = {...eventData,
      eventName:e.target.value,
    };
    seteventData(data);
    onEventDataChange(data);
  };
  const handleStartTime = (e) => {
    const data = {...eventData,
      eventStartTime:e.target.value,
    };
    seteventData(data);
    onEventDataChange(data);
  };
  const handleEndTime = (e) => {
    const data = {...eventData,
      eventEndTime:e.target.value,
    };
    seteventData(data);
    onEventDataChange(data);
  };

  return (
    <div>
      Event Date: {eventDate}
      <div>
        Event Name: <input value={eventName} onChange={handleName} />
      </div>
      <div>
        Event Start:{" "}
        <input
          type="time"
          value={eventStartTime}
          onChange={handleStartTime}
          min={startTime}
          max={maxTime}
        />
      </div>
      <div>
        Event End:{" "}
        <input type="time" value={eventEndTime} onChange={handleEndTime} />
      </div>
    </div>
  );
};
