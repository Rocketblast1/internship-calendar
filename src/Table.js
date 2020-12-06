import React, { useState, useEffect } from "react";
import "./Table.css";
import _ from "lodash";
import moment from "moment";
import { Modal, Input } from "antd";

export default function Table() {
  const [state, setstate] = useState({
    today: moment(),
  });
  const weekDays = moment.weekdaysShort();
  let dayCol = _.range(0, 7);
  let hours = _.range(0, 24);

  useEffect(() => {
    genWeek();
  }, [state]);

  const addEvent = (hour, day) => {
    Modal.confirm({
      content: (
        <div>
          {hour} : {day}
          <Input />
        </div>
      ),
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const genWeek = () => {
    let currentWeek = state.today.clone()
    return weekDays.map((day, index) => {
      return (
        <th>
          {day} {currentWeek.startOf("week").add(index, "d").date()}
        </th>
      );
    });
  };

  return (
    <div>
      <button
          onClick={() => {
            let temp = state.today.clone()
            setstate({
              ...state,
              currentWeek: temp.startOf('week').subtract(1, "week").week(),
            });
            console.log(state.currentWeek)

          }}
        >
          Previous Week
        </button>
        <button> Next Week </button>
      <div className="calendar-grid-container">
        {/* Generates the hour scale */}
        <div className="hour-scale">
          <table>
            <tbody>
              <tr></tr>
              {hours.map((index) => {
                return (
                  <tr>
                    <td>{`${-12 + index}:00`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <table className="calendar-grid">
          {/* Generates the Header dates */}
          <thead>
            <tr>{genWeek()}</tr>
          </thead>

          <thead></thead>
          {/* Generates the hours grid */}
          <tbody>
            {hours.map((hour) => {
              return (
                <tr>
                  {dayCol.map((day) => {
                    return (
                      <td
                        onClick={() => {
                          addEvent(hour, day);
                          moment().set("month", 3);
                        }}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
