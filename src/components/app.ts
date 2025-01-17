
import { html, render, TemplateResult } from 'lit-html';
import { form } from './form';
import { escapeHtml } from '../libs/escape';

const root :Element = document.querySelector('#root');

const data :State = {
  name: '',
  role: '',
  email: '',
  phone: '',
  graphic: 0,
}

const app = () :TemplateResult => html`
  <main class="container">
    <h1>Email signature builder</h1>
    <p>Complete form and then copy the preview into your preferred email client:</p>
    <ul>
      <li><b>Gmail:</b> you copy the preview on the right and paste in the signature field.</li>
      <li><b>Outlook:</b> you copy the preview on the right and paste in the signature field.</li>
      <li><b>Apple Mail:</b> similar to Gmail, but you have to uncheck <i>"Always match my default messsage font"</i>.</li>
    </ul>
    ${form(data)}
  </main>
`;

const _render = () :void => {
  render(app(), root);
  const code :Element = document.querySelector('pre code');
  const preview :HTMLDivElement = document.querySelector('#preview div');
  code.innerHTML = escapeHtml(preview.innerHTML);
}

document.body.addEventListener('update-data', (evt :CustomEvent) => {
  const det :FieldData = evt.detail;
  data[det.key] = det.value;
  _render();
});

_render();
