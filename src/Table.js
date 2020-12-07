import React from "react";
import moment from "moment";
import { fullDateFormat, today, ddmmyyyy } from "./Calendar";

export const Table = (props) => {
  const { hours, dayCol, addEvent, referenceDay, getCellValue } = props;
  const weekDays = moment.weekdays();
  return (
    <table className="calendar-grid">
      {/* Generates the Header dates */}
      <thead>
        <tr>
          {weekDays.map((day, index) => {
            const refDay = moment(referenceDay, fullDateFormat);
            const dDate = refDay
              .startOf("week")
              .add(index, "d")
              .format(ddmmyyyy);
            const bgColor = today === dDate ? "#ffa9a9" : "";
            return (
              <th style={{ background: bgColor }} key={`day-${index}`}>
                {day} {dDate}
              </th>
            );
          })}
        </tr>
      </thead>

      <thead></thead>
      {/* Generates the hours grid */}
      <tbody>
        {hours.map((hour, hr) => {
          return (
            <tr key={`td-${hr}`}>
              {dayCol.map((day, index) => {
                  const cellStyle = {
                    background: "lightblue",
                    borderRadius: "4px",
                    fontSize: "10px",
                    height: "40px",
                  };
                let cellElement = <div/>
                const cellValue = getCellValue(hour, day);

                if (cellValue) {
                    cellElement = <div style={cellStyle}>{cellValue}</div>
                }
                return (
                  <td
                    key={`td-${index}`}
                    onClick={() => {
                      addEvent(hour, day);
                    }}
                  >
                    {cellElement}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
