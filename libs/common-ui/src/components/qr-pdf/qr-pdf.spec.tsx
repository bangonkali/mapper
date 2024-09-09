import { render } from '@testing-library/react';

import QrPdf from './qr-pdf';

describe('QrPdf', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QrPdf />);
    expect(baseElement).toBeTruthy();
  });
});
