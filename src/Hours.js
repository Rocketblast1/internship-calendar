import React from 'react'
import moment from 'moment'

export default function Hours(props) {
    return (
        <div className="hour-scale">
        <table>
          <tbody>
            <tr></tr>
            {props.hours.map((hours) => {
                const baseHr = moment(hours, 'H').format('hh:00 a');
              return (
                <tr key={`hours-td-${hours}`}>
                  <td >{baseHr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
}
