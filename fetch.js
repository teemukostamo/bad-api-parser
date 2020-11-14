const axios = require('axios');
const fs = require('fs');
const productTypes = ['shirts', 'jackets', 'accessories'];
const baseUrl = 'https://bad-api-assignment.reaktor.com';

const parseAvailability = (string) => {
  const availability = string.substring(31).slice(0, -31);

  return availability;
};

const getShirts = async () => {
  const req = await axios.get(
    'https://bad-api-assignment.reaktor.com/products/shirts'
  );

  return req.data;
};

const fetchData = async () => {
  const shirts = await getShirts();

  const shirtManufacturers = [...new Set(shirts.map((m) => m.manufacturer))];

  const allAvailabilities = await getAvailabilities(shirtManufacturers);

  const shirtsWithAvailability = [];

  //
  shirts.forEach((shirt) => {
    const availability = allAvailabilities.find(
      (a) => a.id.toUpperCase() === shirt.id.toUpperCase()
    );

    const shirtWithAvailability = {
      ...shirt,
      availability: {
        id: availability.id,
        DATAPAYLOAD: parseAvailability(availability.DATAPAYLOAD),
      },
    };
    shirtsWithAvailability.push(shirtWithAvailability);
  });

  console.log(shirtsWithAvailability[0]);
  console.log(shirtsWithAvailability[1]);
  console.log(shirtsWithAvailability[2]);

  const jsonShirts = JSON.stringify(shirtsWithAvailability);
  fs.writeFileSync('json/shirts.json', jsonShirts, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });
};

const getAvailability = async (manufacturer) => {
  const req = await axios.get(
    `https://bad-api-assignment.reaktor.com/availability/${manufacturer}`
  );

  return req.data.response;
};

const getAvailabilities = async (manufacturers) => {
  const availabilities = [];

  await Promise.all(
    manufacturers.map(async (m) => {
      const data = await getAvailability(m);
      // if data === [] refetch data
      availabilities.push(data);
    })
  );

  return availabilities.flat(1);
};
module.exports = fetchData;
