import { Editor, PluginOptions } from 'grapesjs';
import { variableModel } from '../variable';

const script = function (props: any) {
  console.log(props);
  //Useful to init external library with props value
  const myLibOpts = {
    label: props.label,
    value: props.value,
    max: props.max,
    min: props.min,
  };
  fetch('https://jsonplaceholder.typicode.com/posts/2')
    .then((res) => res.json())
    .then((data) => {
      console.log('fetch ', data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  console.log('toto');
  // alert('My lib options: ' + JSON.stringify(myLibOpts));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (editor: Editor, opts: PluginOptions = {}) => {
  const { Components } = editor;
  // Create a new type "range"
  Components.addType('range', {
    isComponent: (el) => {
      if (el.tagName === 'range') {
        return { type: 'range' };
      }
    },
    model: {
      defaults: {
        script,
        // The tag name that will be used in the final code
        tagName: 'div',
        editable: true,
        //Default attribute value
        label: 'pouet',
        value: 90,
        min: 0,
        max: 100,
        // Component to display in the board (and in preview/build)
        components: [
          {
            tagName: 'span',
            type: 'text',
            attributes: { title: 'foo' },
            components: [
              {
                type: 'textnode',
                content: 'Default label',
              },
            ],
          },
          {
            tagName: 'input',
            attributes: {
              type: 'range',
              min: '0',
              max: '100',
              value: 50,
            },
          },
        ],
        // You would use traits to customize custom properties
        traits: [
          {
            type: 'text',
            name: 'label',
            changeProp: true,
          },
          {
            type: 'text',
            name: 'value',
            changeProp: true,
          },
          {
            type: 'number',
            name: 'min',
            changeProp: true,
          },
          {
            type: 'number',
            name: 'max',
            changeProp: true,
          },
        ],
        // Define which properties to pass (this will also reset your script on their changes)
        'script-props': ['label', 'value', 'min', 'max'],
      },
    },
    view: {
      init() {
        // this.listenTo(this.model, 'change:attributes:value', this.handleChange);
        this.model.closest;
      },

      // handleChange() {
      //   console.log('handleChange', this.model.get('attributes')?.label);
      //   (this.el as any).value = !!this.model.get('attributes')?.value;
      // },
      onRender() {
        // What the user see in the canvas is totally up to you
        // it can be a simple image as a placeholder or
        // you can make it as much close to the original markup

        // this.el.appendChild(test('50'));

        // this.el.innerHTML = `
        // <div>
        // 	<input type="range" id="volume" value="${this.model.attributes.value}" name="volume" min="${this.model.attributes.min}" max="${this.model.attributes.max}" />
        // 	<label for="volume">${this.model.attributes.label}</label>
        // 	<p>${this.model.attributes.value}</p>
        // </div>`;
        return this;
      },
    },
  });
};
