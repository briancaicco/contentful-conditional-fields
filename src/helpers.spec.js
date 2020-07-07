import { toTitleCase, unslugify } from './helpers';

describe('helpers', () => {
  it('should conver to Title case', () => {
    expect(toTitleCase('john doe')).toEqual('John doe');
  });

  it('should unslugify', () => {
    expect(unslugify('john_doe')).toEqual('John doe');
  });
});
