import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-bootstrap-constraint-validations-intl-support/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | playground', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Playground />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Playground>
        template block text
      </Playground>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
