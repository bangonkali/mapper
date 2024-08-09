import { render } from '@testing-library/react';

import MapperPropertyGrid from './mapper-property-grid';

describe('MapperPropertyGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MapperPropertyGrid />);
    expect(baseElement).toBeTruthy();
  });
});
