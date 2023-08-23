const { describe } = require('node:test');
const { URLPath } = require('../src/URLPath');

describe('URLPath', () => {
  describe('joinPath', () => {
    it('should join paths with no slashes in between', () => {
      const base = 'https://google.com';
      const path = 'foo/bar';
      const expected = 'https://google.com/foo/bar';
      const actual = new URLPath(base).joinPath(path).href;

      expect(actual).toBe(expected);
    });

    it('should join paths with slash at end of base', () => {
      const base = 'https://google.com/';
      const path = 'foo/bar';
      const expected = 'https://google.com/foo/bar';
      const actual = new URLPath(base).joinPath(path).href;

      expect(actual).toBe(expected);
    });

    it('should join paths with slash at beginning of path', () => {
      const base = 'https://google.com';
      const path = '/foo/bar';
      const expected = 'https://google.com/foo/bar';
      const actual = new URLPath(base).joinPath(path).href;

      expect(actual).toBe(expected);
    });

    it('should join paths with slash at end of base and end of path', () => {
      const base = 'https://google.com/';
      const path = '/foo/bar';
      const expected = 'https://google.com/foo/bar';
      const actual = new URLPath(base).joinPath(path).href;

      expect(actual).toBe(expected);
    });

    it('should return a new URL path', () => {
      const base = 'https://google.com/';
      const path = '/foo/bar';
      const actual = new URLPath(base).joinPath(path);

      expect(actual instanceof URLPath).toBeTruthy();
    });

    it('should join path before query params', () => {
      const base = 'https://google.com?foo=bar';
      const path = '/api/search';
      const expected = 'https://google.com/api/search?foo=bar';
      const actual = new URLPath(base).joinPath(path);

      expect(actual.href).toBe(expected);
    });

    it('should join path before query params with path that has query params', () => {
      const base = 'https://google.com?foo=bar';
      const path = '/api/search?foo2=bar2';
      const expected = 'https://google.com/api/search?foo2=bar2&foo=bar';
      const actual = new URLPath(base).joinPath(path);

      expect(actual.href).toBe(expected);
    });
  });

  describe('addQueryParams', () => {
    it('should add query params', () => {
      const params = { foo: 'bar' };
      const actual = new URLPath('https://google.com').addQueryParams(params).href;

      expect(actual).toBe('https://google.com?foo=bar');
    });

    it('should replace existing query params', () => {
      const params = { foo: 'bar2' };
      const actual = new URLPath('https://google.com?foo=bar').addQueryParams(params).href;

      expect(actual).toBe('https://google.com?foo=bar&foo=bar2');
    });

    it('should append to existing query params', () => {
      const params = { foo2: 'bar2' };
      const actual = new URLPath('https://google.com?foo=bar').addQueryParams(params).href;

      expect(actual).toBe('https://google.com?foo=bar&foo2=bar2');
    });

    it('should encode query params', () => {
      const params = { foo: 'bar with spaces' };
      const actual = new URLPath('https://google.com').addQueryParams(params).href;

      expect(actual).toBe('https://google.com?foo=bar%20with%20spaces');
    });
  });

  describe('queryStringToObject', () => {
    it('converts a query string into an object', () => {
      const queryString = 'foo=bar&foo2=bar2';
      const actual = URLPath.queryStringToObject(queryString);

      expect(actual).toEqual({ foo: 'bar', foo2: 'bar2' });
    });

    it('should return an empty object if the query string is empty', () => {
      const actual = URLPath.queryStringToObject('');
      expect(actual).toEqual({});
    });

    it('should return an empty object if the query string is null', () => {
      const actual = URLPath.queryStringToObject(null);
      expect(actual).toEqual({});
    });

    it('should return an empty object if the query string is undefined', () => {
      const actual = URLPath.queryStringToObject(undefined);
      expect(actual).toEqual({});
    });

    it('should return an empty object if the query string is not a string', () => {
      const actual = URLPath.queryStringToObject(123);
      expect(actual).toEqual({});
    });
  });
});
