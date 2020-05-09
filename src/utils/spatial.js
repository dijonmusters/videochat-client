const getColumns = (items) => {
  const { innerWidth: width, innerHeight: height } = window;

  switch (items) {
    case 1:
      return '1fr';
    case 2:
      return width >= height ? '1fr 1fr' : '1fr';
    case 3:
      return '1fr 1fr';
    case 4:
      return '1fr 1fr';
    case 5:
      return '1fr 1fr 1fr';
    case 6:
      return '1fr 1fr 1fr';
    case 7:
      return '1fr 1fr 1fr';
    case 8:
      return '1fr 1fr 1fr';
    case 9:
      return '1fr 1fr 1fr';
    default:
      return 'repeat(auto-fill, minmax(250px, 1fr))';
  }
};

export { getColumns };
