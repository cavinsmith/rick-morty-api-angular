import { GenericPagesFacade } from './generic-pages.facade';

describe('GenericPagesFacade', () => {
  it('should be an abstract class', () => {
    expect(GenericPagesFacade).toBeDefined();
    expect(GenericPagesFacade.prototype.constructor).toBe(GenericPagesFacade);
  });

  it('should have abstract methods defined', () => {
    const prototype = GenericPagesFacade.prototype;
    expect(prototype.getPage).toBeDefined();
    expect(prototype.getTotalPagesAndItems).toBeDefined();
  });

  it('should be an abstract class that cannot be instantiated directly', () => {
    // Test that the class is designed to be extended, not instantiated directly
    expect(GenericPagesFacade.prototype.constructor.name).toBe('GenericPagesFacade');
    expect(typeof GenericPagesFacade.prototype.getPage).toBe('function');
    expect(typeof GenericPagesFacade.prototype.getTotalPagesAndItems).toBe('function');
  });
});
