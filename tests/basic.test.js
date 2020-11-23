const axios = require('axios');
const { getTimestamp } = require('../utils');
const { baseUrl } = require('../constants');

test('testing tests', () => {
  const text = 'yolo';

  expect(text).toBe('yolo');
});

test('get timestamp length matches YYYY-MM-DD HH-MM-SS', () => {
  const timestamp = getTimestamp();

  expect(timestamp.length).toBe(19);
});

test('legacy api returns the right fields for product', async () => {
  const response = await axios.get(`${baseUrl}/products/accessories`);

  expect(response.data[0]).toHaveProperty('type');
  expect(response.data[0]).toHaveProperty('name');
  expect(response.data[0]).toHaveProperty('manufacturer');
  expect(response.data[0]).toHaveProperty('id');
  expect(response.data[0]).toHaveProperty('price');

  expect(response.data[1]).toHaveProperty('type');
  expect(response.data[1]).toHaveProperty('name');
  expect(response.data[1]).toHaveProperty('manufacturer');
  expect(response.data[1]).toHaveProperty('id');
  expect(response.data[1]).toHaveProperty('price');
});

test('legacy api returns the right fields for availability & the failure workaround is functional', async () => {
  const getAvailability = async (manufacturer) => {
    const req = await axios.get(`${baseUrl}/availability/${manufacturer}`);

    if (req.data.response === '[]') {
      setTimeout(() => {
        getAvailability(manufacturer);
      }, 100);
    } else {
      return req.data.response;
    }
  };

  const response = await getAvailability('derp');

  expect(response).toEqual(expect.not.stringContaining('[]'));

  expect(response[0]).toHaveProperty('id');
  expect(response[0]).toHaveProperty('DATAPAYLOAD');

  expect(response[1]).toHaveProperty('id');
  expect(response[1]).toHaveProperty('DATAPAYLOAD');
});
