// This function is used to format the institution name to be displayed on the UI in the correct format (e.g. "university of kent" should be displayed as "University of Kent")
export function formattedInstitutionName(institutionName) {
  return institutionName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
