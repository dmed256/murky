const humanMonth = (date: Date) => {
  switch (date.getMonth()) {
  case 0: return 'January';
  case 1: return 'February';
  case 2: return 'March';
  case 3: return 'April';
  case 4: return 'May';
  case 5: return 'June';
  case 6: return 'July';
  case 7: return 'August';
  case 8: return 'September';
  case 9: return 'October';
  case 10: return 'November';
  case 11: return 'December';
  }
  return 'N/A'
};

const timelineDate = (date: Date) => (
  `${humanMonth(date)} ${date.getFullYear()}`
);

const blogDate = (date: Date) => (
  `${humanMonth(date)} ${date.getDate()}, ${date.getFullYear()}`
);

export {
  humanMonth,
  timelineDate,
  blogDate,
}
