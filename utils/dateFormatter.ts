const dateFormatter = (date: Date|string) => {
  let internalDate: Date;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if (typeof date === 'string') {
    internalDate = new Date(date);
  } else {
    internalDate = date;
  }

  return internalDate.toLocaleDateString('en-US', options);
};

export default dateFormatter;