const getParameter = (key) => {
  const argv = process.argv.slice(2);
  const value = argv.find((item) => item.includes(key))?.split('=')[1] || '';
  return value.trim().replace(/"/g, '').replace(/'/g, '');
};

module.exports = { getParameter };
