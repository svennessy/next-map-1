import React from 'react';

type DateTimeRenderProps = {
  date: string | Date; // The date or ISO string to render
  formatOptions?: Intl.DateTimeFormatOptions; // Optional custom format options
  locale?: string; // Optional locale for formatting (default is 'en-US')
};

const DateTimeRender: React.FC<DateTimeRenderProps> = ({
  date,
  formatOptions = {},
  locale = 'en-US',
}) => {
  // If the `date` is a string, create a new Date object
  const dateObj = new Date(date);
  
  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long', // e.g., Monday, Tuesday
    year: 'numeric', // e.g., 2025
    month: 'long', // e.g., January, February
    day: 'numeric', // e.g., 20
    hour: 'numeric', // e.g., 5 (24-hour format)
    minute: 'numeric', // e.g., 30
    second: 'numeric', // e.g., 45
    ...formatOptions, // Merge any additional format options passed as props
  }).format(dateObj);

  return <span>{formattedDate}</span>;
};

export default DateTimeRender;