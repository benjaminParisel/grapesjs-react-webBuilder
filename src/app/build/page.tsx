import Image from 'next/image';
import { Model, Variables } from '@bonitasoft/ui-designer-context-binding';

export default function build() {
  const myVar = 'myVar';

  const formObject = {};

  const inputElements = document.querySelectorAll('[sg-model]');
  //all the h4 element
  const inputBinds = document.querySelectorAll('[sg-bind]');
  console.log('inputElements', inputElements);
  console.log('inputBinds', inputBinds);
  let scope = {}; //Initialize a global scope object.
  function twoWayDataBinding() {
    //@ts-ignore
    for (let elem of inputElements) {
      if (elem.type === 'text') {
        let propName = elem.getAttribute('b-model');
        //@ts-ignore
        elem.addEventListener('keyup', (e) => {
          //@ts-ignore
          scope[propName] = elem.value;
          //@ts-ignore
          console.log('scope.name', scope[propName]);
        });
        updateDom(propName);
      }
    }
  }

  function updateDom(propName: string) {
    if (!scope.hasOwnProperty(propName)) {
      let value: any;
      Object.defineProperty(scope, propName, {
        set: (newValue) => {
          value = newValue;
          //@ts-ignore
          for (let e1 of inputElements) {
            if (e1.getAttribute('sg-model') === propName) {
              e1.value = newValue;
            }
          }
          //@ts-ignore
          for (let e2 of inputBinds) {
            if (e2.getAttribute('sg-bind') === propName) {
              if (!e2.type) {
                e2.innerHTML = newValue;
              }
            }
          }
        },
        get() {
          return value;
        },
      });
    }
  }

  twoWayDataBinding();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div id="ieqj">
        <input type="text" id="i3yg" b-model="name" />
        <div id="itru" b-model="name"></div>
      </div>
    </main>
  );
}
