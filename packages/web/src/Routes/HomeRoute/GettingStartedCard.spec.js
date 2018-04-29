import React from 'react';

import { shallow, mount } from 'enzyme';

import { createStore } from 'redux';

import { Provider } from 'react-redux';

import GettingStartedCardContainer, { 
  GettingStartedCard,
  mapStateToProps
} from './GettingStartedCard';

describe('<GettingStartedCard />', () => {
  it('should mount', () => {
    const wrapper = mount(<GettingStartedCard />)
    expect(wrapper.find('.notification')).toHaveLength(0);
  });

  it('should display when there are empty entries', () => {
    const wrapper = mount(<GettingStartedCard
      hasEmptyCycles={true}
      />)
    expect(wrapper.find('.notification')).toHaveLength(1);
  });

  it('should display when there are empty entries', () => {
    const wrapper = mount(<GettingStartedCard
      hasEmptyLogs={true}
      />)
    expect(wrapper.find('.notification')).toHaveLength(1);
  });

  it('should mount', () => {
    shallow(<GettingStartedCard />)
  });

  it('should connect', () => {
    const store = createStore(s => s, { entries: [] });
    mount((
      <Provider store={store}>
        <GettingStartedCardContainer />
      </Provider>
    ))
  });

  describe('mapStateToProps', () => {
    test('empty', () => {
      const state = { entries: [ ] };
      const props = mapStateToProps(state);
      expect(props).toEqual({
        hasEmptyLogs: true,
        hasEmptyCycles: true,
      });
    })

    test('empty cycles', () => {
      const state = { entries: [
        { type: 'log' }
      ] };
      const props = mapStateToProps(state);
      expect(props).toEqual({
        hasEmptyLogs: false,
        hasEmptyCycles: true,
      });
    })
  });
});
