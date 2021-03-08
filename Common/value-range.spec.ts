import { ValueRange } from './value-range';

describe('ValueRange', () => {
  let valueRange: ValueRange;
  describe('root', () => {
    it('should default to min', () => {
      const min = 0;
      const max = 3;
      valueRange = new ValueRange(min, max);
      expect(valueRange.value).toBe(min);
    });
    it('should default to min when value too large', () => {
      const min = 0;
      const max = 3;
      const value = 5;
      valueRange = new ValueRange(min, max, value);
      expect(valueRange.value).toBe(min);
    });
    it('should default to min when value too small', () => {
      const min = 0;
      const max = 3;
      const value = -5;
      valueRange = new ValueRange(min, max, value);
      expect(valueRange.value).toBe(min);
    });
    it('should set value when value is within range', () => {
      const min = 0;
      const max = 3;
      const value = 2;
      valueRange = new ValueRange(min, max, value);
      expect(valueRange.value).toBe(value);
    });
  });
});
