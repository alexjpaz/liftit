import React from 'react';
import Root from './Root';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';


describe('<Root />', () => {
  xit('test', () => {
    return new Promise((resolve, reject) => {
      const id = new Date().getTime().toString();


      const db = new PouchDB("/tmp/liftit.test"); 

      setTimeout(() => {
        try {
          const wrapper = mount((
            <Root db={{}} firebase={{}} />
          ));

          expect(wrapper.html()).toContain('alt=\"liftit');

        } catch(e) {
          return reject(e);
        }
        return resolve();
      }, 200);
    });
  });
});
