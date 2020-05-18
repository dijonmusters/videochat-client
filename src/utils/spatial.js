const getColumns = (items) => {
  // const { innerWidth: width, innerHeight: height } = window;

  switch (items) {
    case 1:
    case 2:
    case 3:
    case 4:
      return '1fr 1fr';
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      return '1fr 1fr 1fr';
    default:
      return 'repeat(auto-fill, minmax(250px, 1fr))';
  }
};

export { getColumns };
