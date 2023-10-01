import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class LocaleSelectComponent extends Component {
  @service intl;

  supportedLocales = {
    'de-de': 'Deutsch',
    'en-us': 'English',
  };

  @action
  updateLocale(event) {
    const el = event.target;
    this.intl.setLocale(el.value);
  }
}
