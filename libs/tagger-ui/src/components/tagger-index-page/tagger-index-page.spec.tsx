import { render } from '@testing-library/react';

import TaggerIndexPage from './tagger-index-page';

describe('TaggerIndexPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaggerIndexPage />);
    expect(baseElement).toBeTruthy();
  });
});
