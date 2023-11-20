import moment from "moment";
import "moment-timezone";

/**
 * The `useDate` function in JavaScript exports two helper functions, `dateFormater` and
 * `currentTimeZone`, which can be used for formatting dates and getting the current time zone.
 * @returns The function `useDate` returns an object with two properties: `dateFormater` and
 * `currentTimeZone`.
 */
export default function useDate() {
  // dateFormater: 2021-01-01
  const dateFormater = (time) => {
    let date = new Date(time * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // currentTimeZone: {start: 2021-01-01, end: 2021-01-01}
  const currentTimeZone = (dateStart, dateEnd) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let start = new Date(moment(dateStart).tz(timeZone).toDate());
    let end = new Date(moment(dateEnd).tz(timeZone).toDate());
    return { start, end };
  };

  return { dateFormater, currentTimeZone };
}
