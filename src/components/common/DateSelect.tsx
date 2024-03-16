import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";

interface DateSelectProps {
  onChange: (value: string) => any;
}

export default function DateSelect({ onChange }: DateSelectProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [isError, setIsError] = useState(false);

  const daysList: (number | string)[] = ["Day"];
  for (let day = 1; day <= 31; day++) {
    daysList.push(day);
  }

  const monthList = [
    "Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const yearList: (number | string)[] = ["Year"];
  for (let year = new Date().getFullYear() - 3; year >= 1900; year--) {
    yearList.push(year);
  }

  const validateDate = (): boolean => {
    let isValid = false;
    if (day !== "" && month !== "" && year !== "") {
      const monthVal = monthList.indexOf(month).toString().padStart(2, "0");
      let dateString = `${year}-${monthVal}-${day}`;
      const format = "YYYY-MM-DD";
      const isValid = moment(dateString, format).isValid();
      if (isValid) {
        setDate(dateString);
        onChange(dateString)
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
    return isValid;
  };

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDay(e.target.value);
  };
  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };
  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    validateDate()
  }, [day, month, year]);

  return (
    <div>
      <div className="flex gap-4">
        <select
          name="dayOfBirth"
          id="dayOfBirth"
          className="grow p-2 bg-grey-800 outline-none rounded-sm"
          required
          value={day}
          onChange={handleDayChange}
        >
          {daysList.map((day, index) => (
            <option key={index} value={index !== 0 ? day : undefined}>
              {day}
            </option>
          ))}
        </select>
        <select
          name="monthOfBirth"
          id="monthOfBirth"
          required
          value={month}
          onChange={handleMonthChange}
          className="grow p-2 bg-grey-800 outline-none rounded-sm"
        >
          {monthList.map((month, index) => (
            <option key={index} value={index !== 0 ? month : undefined}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="yearOfBirth"
          id="yearOfBirth"
          required
          value={year}
          onChange={handleYearChange}
          className="grow p-2 bg-grey-800 outline-none rounded-sm"
        >
          {yearList.map((year, index) => (
            <option key={index} value={index !== 0 ? year : undefined}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {isError && (
        <div className="mt-2">
          <p className="text-red-500 text-sm">Invalid date selection</p>
        </div>
      )}
    </div>
  );
}
