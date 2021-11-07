import { LogisticProvider } from './logistic_provider';

describe('LogisticProvider', () => {
  it('should be defined', () => {
    expect(new LogisticProvider('', [])).toBeDefined();
  });
});
