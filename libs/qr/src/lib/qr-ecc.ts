/*
 * QR Code generator library (TypeScript)
 *
 * Copyright (c) Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */
type int = number;

/*
 * The error correction level in a QR Code symbol. Immutable.
 */
export class Ecc {
  /*-- Constants --*/

  public static readonly LOW = new Ecc(0, 1); // The QR Code can tolerate about  7% erroneous codewords
  public static readonly MEDIUM = new Ecc(1, 0); // The QR Code can tolerate about 15% erroneous codewords
  public static readonly QUARTILE = new Ecc(2, 3); // The QR Code can tolerate about 25% erroneous codewords
  public static readonly HIGH = new Ecc(3, 2); // The QR Code can tolerate about 30% erroneous codewords

  /*-- Constructor and fields --*/

  private constructor(
    // In the range 0 to 3 (unsigned 2-bit integer).
    public readonly ordinal: int,
    // (Package-private) In the range 0 to 3 (unsigned 2-bit integer).
    public readonly formatBits: int
  ) {}
}
