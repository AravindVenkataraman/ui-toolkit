import { newSpecPage } from '@stencil/core/testing';
import { CvsPbmDpp } from './cvs-pbm-dpp';

describe('cvs-pbm-dpp', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components: [CvsPbmDpp],
      html: '<cvs-pbm-dpp></cvs-pbm-dpp>'
    });
    expect(root).toEqualHtml(`
      <cvs-pbm-dpp>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </cvs-pbm-dpp>
    `);
  });

  it('renders with values', async () => {
    const {root} = await newSpecPage({
      components: [CvsPbmDpp],
      html: `<cvs-pbm-dpp first="Stencil" last="'Don't call me a framework' JS"></cvs-pbm-dpp>`
    });
    expect(root).toEqualHtml(`
      <cvs-pbm-dpp first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </cvs-pbm-dpp>
    `);
  });
});
