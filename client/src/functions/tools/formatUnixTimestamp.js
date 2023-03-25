// This function takes a unix timestamp and returns a formatted date and time string
function formatUnixTimestamp(unixTimestamp) {
  const dateObj = new Date(unixTimestamp * 1000); // convert to milliseconds
  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString();
  return `${formattedDate} ${formattedTime}`;
}

export default formatUnixTimestamp;
