import React from 'react';
import Root from './Root';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import PouchDB from 'pouchdb';

describe('<Root />', () => {
  it('test', () => {
    return new Promise((resolve, reject) => {
      const id = new Date().getTime().toString();


      const db = new PouchDB("liftit"); 

      setTimeout(() => {
        try {
          const wrapper = mount((
            <Root db={db} />
          ));

          expect(wrapper.html()).toContain('<h1>Liftit</h1>');

        } catch(e) {
          return reject(e);
        }
        return resolve();
      }, 200);
    });
  });
});
