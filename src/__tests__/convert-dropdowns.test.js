const fs = require('fs');
const { convertDropdownsToRadios } = require('../convert-dropdowns');

const htmlMock = fs.readFileSync(`${__dirname}/../__mocks__/salsa-action.html`);

describe('convertDropdownsToRadios', () => {
  beforeEach(() => {
    document.body.innerHTML = htmlMock;
  });

  it('creates a OQS div that matches the expected snapshot', () => {
    expect.assertions(2);
    convertDropdownsToRadios();
    expect(document.body.querySelectorAll('.oqs')).not.toBeNull();
    document.body.querySelectorAll('.oqs').forEach(oqs => {
      expect(oqs).toMatchSnapshot();
    })
  });

  it('removes the original select element', () => {
    expect.assertions(1);
    convertDropdownsToRadios();
    expect(document.body.querySelector('select[name="do_you_trust_donald_trump_"]')).toBeNull();
  });
});
