import fs from 'fs';
import convertDropdowns from '../convert-dropdowns';

const htmlMock = fs.readFileSync(`${__dirname}/../__mocks__/salsa-action.html`);

describe('convertDropdowns', () => {
  beforeEach(() => {
    document.body.innerHTML = htmlMock;
  });

  it('creates a OQS div that matches the expected snapshot', () => {
    expect.assertions(2);
    convertDropdowns('No');
    expect(document.body.querySelectorAll('.oqs')).not.toBeNull();
    document.body.querySelectorAll('.oqs').forEach(oqs => {
      expect(oqs).toMatchSnapshot();
    })
  });

  it('removes the original select element', () => {
    expect.assertions(1);
    convertDropdowns('No');
    expect(document.body.querySelector('select[name="do_you_trust_donald_trump_"]')).toBeNull();
  });
});
