'use client';

import grapesjs, { Editor, EditorConfig } from 'grapesjs';
import GjsEditor from '@grapesjs/react';
import gjsForms from 'grapesjs-plugin-forms';
import gjsBasic from 'grapesjs-blocks-basic';
import textDynamic from './plugins/TextDynamic';
import customCodePlugin from 'grapesjs-custom-code';

const gjsOptions: EditorConfig = {
  height: '100vh',
  undoManager: true,
  storageManager: {
    type: 'local',
    autoload: true,
    options: {
      local: { key: `gjsProject` },
    },
  },

  selectorManager: { componentFirst: true },

  // Uncommented to load default template, actually, we load from localStorage
  // projectData: {
  //   assets: [
  //     'https://via.placeholder.com/350x250/78c5d6/fff',
  //     'https://via.placeholder.com/350x250/459ba8/fff',
  //     'https://via.placeholder.com/350x250/79c267/fff',
  //     'https://via.placeholder.com/350x250/c5d647/fff',
  //     'https://via.placeholder.com/350x250/f28c33/fff',
  //   ],
  //   pages: [
  //     //   {
  //     //     name: 'Home page',
  //     //     //       component: `<h1>GrapesJS React Custom UI</h1>
  //     //     //           <slider data-gjs-type="range"></slider>
  //     //     //           <label>toto</label>
  //     //     //           <ul>
  //     //     //           <li>aa</li>
  //     //     //           </ul>
  //     //     //       `,
  //     //   },
  //   ],
  // },
  parser: {
    optionsHtml: { allowScripts: true },
    // textTags: ['br', 'b', 'i', 'u', 'a', 'ul', 'ol', 'label'],
  },
};
export const Playground = () => {
  const onEditor = async (editor: Editor) => {
    //Set block activate by default
    editor.Panels?.getButton('views', 'open-blocks')?.set('active', true);
    editor.BlockManager.add('slider', {
      label: 'Slider',
      //      content: `<range data-gjs-type="range"></range>`,
      content: { type: 'range' },
      category: 'Custom',
    });

    var codeManager = editor.CodeManager;
    codeManager.addGenerator('htmlTest', {
      build: () => {
        console.log('generator htmlTest');
        return 'myCode';
      },
    });

    // console.log('component:selected', model);
    // const lastSelected = editor.getSelected();
    // console.log('lastSelected', lastSelected);
    editor.on('component:selected', (model) => {
      const lastSelected = editor.getSelected();
      // console.log('lastSelected', lastSelected, model);
    });

    editor.on('component:add', (model) => {
      // console.log('add', model);
      editor.Panels?.getButton('views', 'osm')?.set('active', true);
    });

    editor.on('component:selected', (model) => {
      editor.Panels?.getButton('views', 'open-tm')?.set('active', true);
    });

    editor.on('component:add', (model) => {
      editor.Panels?.getButton('views', 'open-tm')?.set('active', true);
    });

    editor.on('component:deselected', (model) => {
      // console.log('selected', editor.getSelected());
      editor.Panels?.getButton('views', 'open-blocks')?.set('active', true);
    });

    editor.on('parse:html', (obj) => {
      console.log('parse:html', obj);
    });

    const parser = editor.getConfig().parser;
    console.log('parser', parser);
    // This following didn't work
    //initDynamicExtension(editor);

    // To add some behavior in the RichTextEditor
    // editor.RichTextEditor.add('custom-vars', {
    //   icon: `<select class="gjs-field">
    //         <option value="">- Select -</option>
    //             <option value="[[firstname]]">FirstName</option>
    //             <option value="[[lastname]]">LastName</option>
    //             <option value="[[age]]">Age</option>
    //           </select>`,
    //   // Bind the 'result' on 'change' listener
    //   event: 'change',
    //   //@ts-ignore
    //   result: (rte, action) => rte.insertHTML(action.btn?.firstChild?.value),
    //   // Reset the select on change
    //   //@ts-ignore
    //   // update: (rte, action) => {
    //   //   //@ts-ignore
    //   //   action.btn?.firstChild?.value = '';
    //   // },
    // });
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      // GrapesJS init options
      options={gjsOptions}
      plugins={[gjsBasic, gjsForms, textDynamic, customCodePlugin]}
      onEditor={onEditor}
    />
  );
};

function initDynamicExtension(editor: any) {
  // Ajoute un panneau pour les variables
  // Crée un panneau pour les variables
  const panels = editor.Panels;
  const variablesPanel = panels.addPanel({
    id: 'variables-panel',
    el: '.variables-panel',
    title: 'Variables',
  });

  // Ajoute des champs pour déclarer les variables
  // variablesPanel.add({
  //   id: 'variable-name',
  //   type: 'text',
  //   label: 'Nom de la variable',
  // });

  // variablesPanel.add({
  //   id: 'variable-value',
  //   type: 'text',
  //   label: 'Valeur de la variable',
  // });

  // // Ajoute un bouton pour ajouter la variable
  // variablesPanel.addButton({
  //   id: 'add-variable',
  //   label: 'Ajouter Variable',
  //   command: 'add-variable',
  // });
}
