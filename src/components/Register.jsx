import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RequiredText from "./RequiredText";
import moment from "moment/moment";

const Register = ({ show, toggleForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const daysList = ["Day"];
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

  const yearList = ["Year"];
  for (let year = new Date().getFullYear() - 3; year >= 1900; year--) {
    yearList.push(year);
  }

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const validateDate = () => {
    if (day !== "" && month !== "" && year !== "") {
      let dateString = year + "-" + month + "-" + day;
      const format = "YYYY-MM-DD";
      const isValid = moment(dateString, format).isValid();
      console.log(isValid);
      return isValid;
    }
  };

  const validatePassword = (passwordStr) => {
    let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(passwordStr);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    validateDate();
  }, [day, month, year]);

  return (
    <>
      {show && (
        <motion.div
          key="register"
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
            duration: 0.5,
          }}
        >
          <div className="w-[480px] bg-grey-600 rounded-md p-8 shadow-lg">
            <form
              action=""
              className="text-white text-center"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-semibold">Create an account</h2>
              <div className="flex flex-col text-grey-400 text-left">
                <label htmlFor="email" className="mt-4 mb-2 font-bold text-xs">
                  <RequiredText>EMAIL</RequiredText>
                </label>
                <input
                  type="text"
                  id="email"
                  required
                  className="p-2 font-normal outline-none rounded-sm bg-grey-800"
                />

                <label htmlFor="email" className="mt-4 mb-2 font-bold text-xs">
                  DISPLAY NAME
                </label>
                <input
                  type="text"
                  id="email"
                  className="p-2 font-normal outline-none rounded-sm bg-grey-800"
                />

                <label htmlFor="email" className="mt-4 mb-2 font-bold text-xs">
                  <RequiredText>USERNAME</RequiredText>
                </label>
                <input
                  type="text"
                  id="email"
                  required
                  className="p-2 font-normal outline-none rounded-sm bg-grey-800"
                />

                <label
                  htmlFor="password"
                  className="mt-4 mb-2 font-bold text-xs"
                >
                  <RequiredText>PASSWORD</RequiredText>
                </label>
                <input
                  type="text"
                  id="password"
                  required
                  className="p-2 font-normal outline-none rounded-sm bg-grey-800"
                />

                <label
                  htmlFor="password"
                  className="mt-4 mb-2 font-bold text-xs"
                >
                  DATE OF BIRTH
                </label>
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
                      <option key={index} value={index !== 0 && day}>
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
                      <option key={index} value={index !== 0 && month}>
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
                      <option key={index} value={index !== 0 && year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="text-white p-4 bg-purple-500 rounded-md mt-6 font-semibold hover:bg-purple-600 duration-200"
                  type="submit"
                >
                  Continue
                </button>
                <p className="mt-2 text-xs">
                  By registering, you agree to NotDiscord's{" "}
                  <span className="text-sky-400">Terms of Service </span>
                  and
                  <span className="text-sky-400"> Privacy Policy</span>
                </p>

                <button
                  className="text-sky-400 hover:underline text-sm text-left mt-4"
                  onClick={toggleForm}
                >
                  Already have an account?
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Register;
