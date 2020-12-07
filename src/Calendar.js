import React, { useState, Component } from "react";
import "./Calendar.css";
import _ from "lodash";
import moment from "moment";
import { Modal } from "antd";
import Hours from "./Hours";
import { Table } from "./Table";
import { ModalContent } from "./ModalContent";
export const fullDateFormat = "DD/MM/yyyy hh:mm:ss";
export const ddmmyyyy = "DD/MM/yyyy";
export const today = moment().format(ddmmyyyy);

export default class Calendar extends Component {
  state = {
    referenceDay: moment().format(fullDateFormat),
    eventOutput: { eventName: '', eventStartTime: '', eventEndTime: '', eventDate: '' },
    eventElement: <div/>,
    weeklyEventList: []
  }
  getCellValue = (hour, day) =>{
    const {referenceDay} = this.state;
    const weeklyEventList = this.state.weeklyEventList;
    const currentDate = moment(referenceDay, fullDateFormat).add(day, "d");
    const selectedDate = currentDate.format(ddmmyyyy);
    const selectedHour = moment(hour, "H").format("hh:mm");
    const foundElements = weeklyEventList.find(e => {
      return e.eventStartTime === selectedHour && e.eventDate === selectedDate
    });

    if (foundElements){
      const start = moment(foundElements.eventStartTime,'HH:mm a');
      const end = moment(foundElements.eventEndTime,'HH:mm a');
      const title = foundElements.eventName;
      const eventDuration = end.diff(start, 'hours')
      const eventElement = <div>
        {title} <br/>
        {start.format('hh:mm a')}-{end.format('hh:mm a')}
      </div>;
      return eventElement;
    }
    return null
  }

  handleOk = () => {
    console.log(this.state.eventOutput)
    const weeklyEventList = this.state.weeklyEventList;
    weeklyEventList.push(this.state.eventOutput)
    this.setState({weeklyEventList});
  };
  onEventDataChange = (data) => {
    this.setState({eventOutput: data})
  };
  handleCancel = () => {
    console.log("Cancel");
  };
  addEvent = (hour, day) => {
    const {referenceDay} = this.state;
    const currentDate = moment(referenceDay, fullDateFormat).add(day, "d");
    const formattedDate = currentDate.format(ddmmyyyy);
    const currentHour = moment(hour, "H").format("hh:mm");
    Modal.confirm({
      content: (
        <ModalContent
          eventDate={formattedDate}
          startTime={currentHour}
          maxTime={currentHour}
          hour={hour}
          day={day}
          onEventDataChange={this.onEventDataChange}
        />
      ),
      onOk: this.handleOk,
      onCancel: this.handleCancel,
    });
  };

  render(){
  const {referenceDay} = this.state;
  const dayCol = _.range(0, 7);
  const hours = _.range(0, 24);

  const nextWeek = () => {
    const tempRefDay = moment(referenceDay, fullDateFormat);
    const currentWeekStart = tempRefDay.startOf("week");
    const nextWeekStart = tempRefDay.startOf("week").add(1, "week");
    this.setState({referenceDay: tempRefDay});
    console.log(tempRefDay.format(fullDateFormat));
  };

  const prevWeek = () => {
    const tempRefDay = moment(referenceDay, fullDateFormat);
    const currentWeekStart = tempRefDay.startOf("week");
    const prevWeekStart = tempRefDay.startOf("week").subtract(1, "week");
    this.setState({referenceDay: tempRefDay});
    console.log(tempRefDay.format(fullDateFormat));
  };

  return (
    <div>
      <button onClick={prevWeek}> Previous Week </button>
      <button onClick={nextWeek}> Next Week </button>

      <div className="calendar-grid-container">
        {/* Generates the hour scale */}
        <Hours hours={hours} />
        <Table
          referenceDay={referenceDay}
          hours={hours}
          dayCol={dayCol}
          addEvent={this.addEvent}
          getCellValue={this.getCellValue}
        />
      </div>
    </div>
  );
  }
}
