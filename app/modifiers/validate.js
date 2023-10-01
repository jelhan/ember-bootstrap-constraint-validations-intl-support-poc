import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';

const eventsToValidate = ['change', 'input', 'invalid'];

export default class TrackClick extends Modifier {
  @service intl;
  @service metrics;

  eventListenersRegistered = false;

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, this.cleanup);
  }

  modify(element) {
    this.element = element;

    // consum current locale to ensure validation message is updated
    // when locale changes
    this.intl.primaryLocale;

    // validate initial input and revalidate when locale changes
    this.validate({ target: element });

    if (!this.eventListenersRegistered) {
      for (const eventName of eventsToValidate) {
        element.addEventListener(eventName, this.validate);
      }
    }
  }

  @action
  cleanup() {
    for (const eventName of eventsToValidate) {
      this.element.removeEventListener(eventName, this.validate);
    }
  }

  @action
  validate({ target: el }) {
    // reset custom validation state
    el.setCustomValidity('');

    const { validity } = el;

    if (validity.valid) {
      return;
    }

    if (validity.valueMissing) {
      el.setCustomValidity(this.intl.t('validation.valueMissing'));
      return;
    }

    if (validity.tooShort) {
      el.setCustomValidity(
        this.intl.t('validation.tooShort', {
          min: el.getAttribute('minlength'),
        })
      );
      return;
    }

    throw new Error('Validation error not supported');
  }
}
