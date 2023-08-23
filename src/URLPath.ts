import qs from 'qs';

/**
 * Class to help joining URLs and adding query parameters.
 */
export class URLPath {
  public href: string;

  /**
   *  Create a new URLPath object.
   * @param {string} href The base or full URL.
   */
  constructor(href: string) {
    if (!href) {
      throw new Error('Missing required parameter: href');
    }

    this.href = href;
  }

  /**
   * Join a new path to the end of the current.
   * @param {string} path
   * @returns {URLPath}
   */
  joinPath(path: string): URLPath {
    if (!path) {
      throw new Error('Missing required parameter: path');
    }

    if (this.href.includes('?')) {
      const [base, query] = this.href.split('?');
      const queryStringObject = URLPath.queryStringToObject(query);
      return new URLPath(base).joinPath(path).addQueryParams(queryStringObject);
    }

    if (path.startsWith('/')) {
      path = path.slice(1);
    }

    if (this.href.endsWith('/')) {
      return new URLPath(`${this.href}${path}`);
    } else {
      return new URLPath(`${this.href}/${path}`);
    }
  }

  /**
   * Add query parameters to the URL.
   * @param {Record<string, any>} params Object containing query params to add.
   * @returns {URLPath}
   */
  addQueryParams(params: Record<string, any>): URLPath {
    if (this.href.includes('?')) {
      return new URLPath(`${this.href}&${qs.stringify(params)}`);
    }

    return new URLPath(`${this.href}?${qs.stringify(params)}`);
  }

  /**
   * Parse a query string into an object.
   * @param {string} queryString
   * @returns An object containing the parsed query params.
   */
  static queryStringToObject(queryString: string): Record<string, any> {
    return qs.parse(queryString);
  }
}
