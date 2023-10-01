import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class FormData {
  @tracked email;
  @tracked password;
}

export default class PlaygroundComponent extends Component {
  data = new FormData();

  @action
  submit() {
    window.alert('Form submitted');
  }
}
