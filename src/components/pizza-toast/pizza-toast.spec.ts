import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './pizza-toast';

describe('pizza-toast', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components: [MyComponent],
      html: '<pizza-toast></pizza-toast>'
    });
    expect(root).toEqualHtml(`
      <pizza-toast>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </pizza-toast>
    `);
  });

  it('renders with values', async () => {
    const {root} = await newSpecPage({
      components: [MyComponent],
      html: `<pizza-toast first="Stencil" last="'Don't call me a framework' JS"></pizza-toast>`
    });
    expect(root).toEqualHtml(`
      <pizza-toast first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </pizza-toast>
    `);
  });
});
