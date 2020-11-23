const addZero = (string) => {
  return string.length === 1 ? `0${string}` : string;
};

const getTimestamp = () => {
  let date_ob = new Date();

  // adjust 0 before single digit date
  let date = ('0' + date_ob.getDate()).slice(-2);

  // current month
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear().toString();

  // current hours
  let hours = date_ob.getHours().toString();

  // current minutes
  let minutes = date_ob.getMinutes().toString();

  // current seconds
  let seconds = date_ob.getSeconds().toString();

  return `${year}-${addZero(month)}-${addZero(date)} ${addZero(
    hours
  )}:${addZero(minutes)}:${addZero(seconds)}`;
};

module.exports = { getTimestamp };
