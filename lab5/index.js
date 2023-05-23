const express = require('express');
const Papa = require('papaparse');
const {phone} = require('phone');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({}));

app.post('/etl', (req, res) => {
  let { csv } = req.files;
  if (!csv.length) {
    csv = [csv];
  }
  const result = csv.map((file) => unifyData(file)).flat();
  fs.writeFileSync('orders.json', JSON.stringify(result));
  res.send(result);
});

function unifyData(csv) {
  const stream = csv.data.toString();
  const result = Papa.parse(stream, {
    header: true,
  });

  return result.data.map(row => {
    const phoneNumber = unifyPhoneNumber(row.phonenumber);
    const address = unifyAddress(row.address);
    const amount = unifyAmount(row.amount);

    return {
      name: row.name,
      phoneNumber,
      address,
      goodID: row.goodID,
      amount,
    };
  });
}

function unifyAddress (address) {
  address = address.trim();
  address = address.replace(/[.,]/g, '');
  const startsWithNumber = /^\d+/.test(address);

  if (startsWithNumber) {
    const number = address.match(/^\d+/)[0];
    address = address.replace(/^\d+\s*/, '');
    address += ' ' + number;
  }

  return address;
}

function unifyPhoneNumber (phoneNumber) {
  const country = 'UA';
  const unifiedPhoneNumber = phone(phoneNumber, {country});
  if (!unifiedPhoneNumber) {
    return null;
  }
  return unifiedPhoneNumber.phoneNumber;
}

function unifyAmount(amount) {
  return amount.replace(/[,\s]/g, '');
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
