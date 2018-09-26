const classnames = (...args: any[]) => (
  args.reduce((str, arg) => {
    if (!arg) {
      return str;
    }
    if (!str) {
      return arg;
    }
    return `${str} ${arg}`;
  }, '')
);

export default classnames;
