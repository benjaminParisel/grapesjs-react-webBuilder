//all the input elements
const inputsModel = document.querySelectorAll(
  '[b-model]'
) as NodeListOf<HTMLInputElement>;
console.log('b-model', inputsModel);
//all the h4 element
const elementsBind = document.querySelectorAll(
  '[b-bind]'
) as NodeListOf<HTMLElement>;
console.log('b-bind', elementsBind);

interface Variable {
  [key: string]: string | number | undefined;
}
let scope: Variable = {}; //Initialize a global scope object.

export function twoWayDataBinding() {
  inputsModel.forEach((elem) => {
    switch (elem.type) {
      case 'text':
        let propName = elem.getAttribute('b-model') ?? '';
        if (propName === '') {
          return;
        }
        elem.addEventListener('keyup', (e) => {
          scope[propName] = elem.value;
          console.log('scope', scope[propName]);
        });
        updateDom(propName);
        break;
    }
    if (elem.tagName === 'SELECT') {
      let propName = elem.getAttribute('b-model') ?? '';
      if (!propName) {
        return '';
      }
      elem.addEventListener('change', (e) => {
        scope[propName] = elem.value;
      });
      updateDom(propName);
    }
  });
}

export function updateDom(propName: string) {
  if (!scope.hasOwnProperty(propName)) {
    let value = '';
    Object.defineProperty(scope, propName, {
      set: (newValue) => {
        value = newValue;
        inputsModel.forEach((e1) => {
          if (e1.getAttribute('b-model') === propName) {
            e1.value = newValue;
          }
        });
        elementsBind.forEach((e2) => {
          if (e2.getAttribute('b-bind') === propName) {
            e2.innerHTML = newValue;
          }
        });
      },
      get() {
        return value;
      },
    });
  }
}

twoWayDataBinding();
