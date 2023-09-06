const inputElements = document.querySelectorAll('[b-model]');
console.log('b-model', inputElements);
//all the h4 element
const inputBinds = document.querySelectorAll('[b-bind]');
console.log('b-bind', inputBinds);
let scope = {}; //Initialize a global scope object.
function twoWayDataBinding() {
  for (let elem of inputElements) {
    console.log('elem', elem.tagName);
    if (elem.type === 'text') {
      let propName = elem.getAttribute('b-model');
      elem.addEventListener('keyup', (e) => {
        scope[propName] = elem.value;
        //console.log('scope', scope[propName]);
      });
      updateDom(propName);
    }
    if (elem.tagName === 'SELECT') {
      let propName = elem.getAttribute('b-model');
      elem.addEventListener('change', (e) => {
        scope[propName] = elem.value;
      });
      updateDom(propName);
    }
  }
}

function updateDom(propName) {
  if (!scope.hasOwnProperty(propName)) {
    let value;
    Object.defineProperty(scope, propName, {
      set: (newValue) => {
        value = newValue;
        for (let e1 of inputElements) {
          if (e1.getAttribute('b-model') === propName) {
            e1.value = newValue;
          }
        }
        for (let e2 of inputBinds) {
          if (e2.getAttribute('b-bind') === propName) {
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
