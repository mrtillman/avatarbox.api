import { ValueRange } from './value-range';

describe('ValueRange', () => {
  let valueRange: ValueRange;
  describe('root', () => {
    it('should default to min', () => {
      const min = 0, max = 3;
      valueRange = new ValueRange(min,max);
      expect(valueRange.value).toBe(min);
    });
  });
});
