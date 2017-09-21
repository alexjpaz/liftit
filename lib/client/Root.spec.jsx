import React from 'react';
import Root from './Root';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import Gun from 'gun';

describe('<Root />', () => {
  it('test', () => {
    return new Promise((resolve, reject) => {
      const gun = new Gun({ file: "/dev/null" });

      const id = new Date().getTime().toString();

      gun.get("root").put({
        debug: id
      });

      setTimeout(() => {
        try {
          const wrapper = mount((
            <Root gun={gun} />
          ));

          expect(wrapper.html()).toContain('Calendar');

          expect(wrapper.find('#testDebug').html()).toContain(`\"debug\":\"${id}\"`);
        } catch(e) {
          return reject(e);
        }
        return resolve();
      }, 200);
    });
  });
});
