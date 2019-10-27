import tweento from '../src';

const errorMessage = 'Passed element must be an HTMLElement instance.';

describe('tweento', () => {
  test('should be a function', () => {
    expect(tweento).toBeInstanceOf(Function);
  });

  describe('`element` argument must be a HTMLElement', () => {
    test("should'nt throw error", () => {
      const element = document.createElement('p');

      try {
        tweento(element);
        expect(true).toBeTruthy();
      } catch (error) {
        // do nothing
      }
    });

    test('should throw error (string passed)', () => {
      try {
        tweento('.tweento');
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });

    test('should throw error (number passed)', () => {
      try {
        tweento(2137);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });

    test('should throw error (array passed)', () => {
      try {
        tweento([]);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });

    test('should throw error (object passed)', () => {
      try {
        tweento({});
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });

    test('should throw error (null passed)', () => {
      try {
        tweento(null);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });

    test('should throw error (undefined passed)', () => {
      try {
        tweento(undefined);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  test('should add `tweento` class name', () => {
    const element = document.createElement('p');
    tweento(element, {
      to: 'tweento',
    });

    expect(element.classList.contains('tweento')).toBeTruthy();
  });

  test('should add `height: 20px` inline style', () => {
    const element = document.createElement('p');
    tweento(element, {
      to: {
        height: '20px',
      },
    });

    expect(getComputedStyle(element).getPropertyValue('height')).toBe('20px');
  });

  test('should be paused', () => {
    const element = document.createElement('p');
    tweento(element, {
      to: 'tweento',
      paused: true,
    });

    expect(element.classList.contains('tweento')).toBeFalsy();
  });
});
