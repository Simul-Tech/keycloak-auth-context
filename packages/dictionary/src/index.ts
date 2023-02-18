import parse from 'html-react-parser'
const PLURAL_KEY = '__plural__';

interface IDictionary<T, Q> {

    init(values: T): void

    add<K1 extends keyof T, K2 extends keyof Q>(
      name: K1 | K2,
      value: string
    ): IDictionary<T, Q>;
  
    get<K1 extends keyof T, K2 extends keyof Q>(
      key: K1 | K2,
      params?: { [key: string]: string }
    ): string;
  }
  
  export class Dictionary<T, Q> implements IDictionary<T, Q> {
    items: any;
    name: string;
  
    constructor(name: string) {
      this.items = {};
      this.name = name;
    }

    private replace(str: string, params: { [key: string]: string }) {
      const re = new RegExp(
        Object.keys(params)
          .map((key) => `:${key}`)
          .join('|'),
        'gi'
      );
      str = str.replace(re, function (matched) {
        return params[matched.substring(1).toLowerCase()];
      });
  
      return str;
    }
  
    init(values: T): void {
      this.items = values; 
    }

    add<K1 extends keyof T, K2 extends keyof Q>(
      name: K1 | K2,
      value: string,
      plural?: string
    ) {
      this.items[name as any] = value;
      if(plural) this.items[`${PLURAL_KEY}${name as any}`] = plural

      return this;
    }
  
    get<K1 extends keyof T, K2 extends keyof Q>(
      key: K1 | K2,
      params?: { [key: string]: string },
      options?: { plural: boolean}
    ) {
      if (!this.items.hasOwnProperty(key)) {
        console.warn(`[${this.name}] Missing key ${String(key)}`);
        return `😡 Missing Key: ${String(key)}`;
      }
  
      let _key = options?.plural ? `${PLURAL_KEY}${key as string}` : key;

      if (params) {
        return this.replace(this.items[_key], params);
      }
      return this.items[_key];
    }


    getHTML<K1 extends keyof T, K2 extends keyof Q>(
      key: K1 | K2,
      params?: { [key: string]: string },
      options?: { plural: boolean}
    ) {
      return parse(this.get(key, params, options))
    }
  
    getOrIgnore<K1 extends keyof T, K2 extends keyof Q>(
      key: K1 | K2,
      params?: { [key: string]: string }
    ) {
      if (!this.items.hasOwnProperty(key)) {
        return key;
      }
  
      return this.replaceTranslations(key, params);
    }
  
    private replaceTranslations<
      K1 extends keyof T,
      K2 extends keyof Q
    >(key: K1 | K2, params?: { [key: string]: string }) {
      if (params) {
        return this.replace(this.items[key], params);
      }
      return this.items[key];
    }
  }