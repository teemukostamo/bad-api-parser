const axios = require('axios');
const fs = require('fs');

const { baseUrl } = require('./constants');
const { getTimestamp } = require('./utils');

const parseAvailability = (string) => {
  const availability = string.substring(31).slice(0, -31);

  return availability;
};

const getShirts = async () => {
  const req = await axios.get(`${baseUrl}/products/shirts`);

  return req.data;
};

const getJackets = async () => {
  const req = await axios.get(`${baseUrl}/products/jackets`);

  return req.data;
};

const getAccessories = async () => {
  const req = await axios.get(`${baseUrl}/products/accessories`);

  return req.data;
};

const fetchData = async () => {
  const shirts = await getShirts();
  const jackets = await getJackets();
  const accessories = await getAccessories();

  const shirtManufacturers = [...new Set(shirts.map((m) => m.manufacturer))];
  const jacketManufacturers = [...new Set(jackets.map((m) => m.manufacturer))];
  const accessoryManufacturers = [
    ...new Set(accessories.map((m) => m.manufacturer)),
  ];

  const manufactures = shirtManufacturers.concat(
    jacketManufacturers,
    accessoryManufacturers
  );

  const uniqueManufacturers = [...new Set(manufactures)];

  const allAvailabilities = await getAvailabilities(uniqueManufacturers);

  const shirtsWithAvailability = [];
  const jacketsWithAvailability = [];
  const accessoriesWithAvailability = [];

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

  jackets.forEach((jacket) => {
    const availability = allAvailabilities.find(
      (a) => a.id.toUpperCase() === jacket.id.toUpperCase()
    );

    const jacketWithAvailability = {
      ...jacket,
      availability: {
        id: availability.id,
        DATAPAYLOAD: parseAvailability(availability.DATAPAYLOAD),
      },
    };

    jacketsWithAvailability.push(jacketWithAvailability);
  });

  accessories.forEach((accessory) => {
    const availability = allAvailabilities.find(
      (a) => a.id.toUpperCase() === accessory.id.toUpperCase()
    );

    const accessoryWithAvailability = {
      ...accessory,
      availability: {
        id: availability.id,
        DATAPAYLOAD: parseAvailability(availability.DATAPAYLOAD),
      },
    };

    accessoriesWithAvailability.push(accessoryWithAvailability);
  });

  const jsonShirts = JSON.stringify({
    products: shirtsWithAvailability,
    timestamp: getTimestamp(),
  });
  fs.writeFileSync('json/shirts.json', jsonShirts, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file shirts.json was saved!');
  });

  const jsonJackets = JSON.stringify({
    products: jacketsWithAvailability,
    timestamp: getTimestamp(),
  });
  fs.writeFileSync('json/jackets.json', jsonJackets, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file jackets.json was saved!');
  });

  const jsonAccessories = JSON.stringify({
    products: accessoriesWithAvailability,
    timestamp: getTimestamp(),
  });
  fs.writeFileSync('json/accessories.json', jsonAccessories, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file accessories.json was saved!');
  });
};

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
