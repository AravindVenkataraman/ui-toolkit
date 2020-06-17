import { ButtonComponent } from "./button";
import { newSpecPage } from '@stencil/core/testing';

it("should render ButtonComponent Component", () => {
  expect(new ButtonComponent()).toBeTruthy();
});


it('Should render properly when ShawDom is false', async (): Promise<void> => {
  const page = await newSpecPage({
    components: [ButtonComponent],
    html: `<cvs-button>Hello</cvs-button>`,
    supportsShadowDom: false,
  });

  expect(page.root).toEqualHtml(`
    <cvs-button>
      <button class="basic plain">
        Hello
      </button>
    </cvs-button>
  `);

});

it('Should render properly when ShawDom is true', async (): Promise<void> => {
  const page = await newSpecPage({
    components: [ButtonComponent],
    html: `<cvs-button>Hello</cvs-button>`,
    supportsShadowDom: true,
  });

  expect(page.root).toEqualHtml(`
    <cvs-button>
    <mock:shadow-root>
      <button class="basic plain">
        <slot></slot>
      </button>
      </mock:shadow-root>
      Hello
    </cvs-button>
  `);
});