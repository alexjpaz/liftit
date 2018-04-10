import React from 'react';

import CycleList from './CycleList';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import { lifts } from '../common/Constants';

describe('<CycleList />', () => {

  const construct = (props) => {
    const wrapper = shallow((
      <CycleList {...props} />
    ));
    const instance = wrapper.instance();
    return {
      wrapper,
      instance
    };
  };

  it('should render', () => {
    const wrapper = shallow((
      <CycleList />
    ));
  });

  it('should display a message for empty list', () => {
    const { wrapper } = construct({});

    expect(wrapper.html()).toContain("seem to be any cycles");
  });

  it('should render with items', () => {
    const wrapper = shallow((
      <CycleList 
        items={[{
          _id: 123,
          date: '2018-01-01',
          type: 'cycle',
          press: 100,
          deadlift: 200,
          bench: 300,
          squat: 400,
        }]}
      />
    ));

    expect(wrapper.html()).toContain("100");
    expect(wrapper.html()).toContain("200");
    expect(wrapper.html()).toContain("300");
    expect(wrapper.html()).toContain("400");
    expect(wrapper.html()).toContain("2018-01-01");
    expect(wrapper.find('a[href$="/cycles/123"]')).toHaveLength(1);
  });


  it('should limit items', () => {
    const items = Array(100).fill(true).map((item, id) => {
      return {
        _id: id
      };
    });

    const { wrapper, instance } = construct({ items, limitTo: 10});
    expect(wrapper.find('tbody > tr')).toHaveLength(10);
    expect(instance.getSortedItems()).toHaveLength(10);
  });

  it('should sort cycles', () => {
    const items = [{
      _id: 1,
      date: '2018-01-01'
    },{
      _id: 2,
      date: '2018-02-01'
    }, {
      _id: 3,
      date: '2018-03-01'
    }];

    const { instance } = construct({ items });

    const sorted = instance.getSortedItems();

    expect(sorted.map(i => i._id)).toEqual([3,2,1]);
  });

  it('should decorate items with a delta', () => {
    const { instance } = construct({});

    const cycles = [{
      _id: 1,
      press: 105,
    },{
      _id: 2,
      press: 100,
    }];

    const next = instance.decorateCycles(cycles[0], 0, cycles);

    expect(next._id).toEqual(1);
    expect(next.press_delta).toEqual(5);
  });

  it('should decorate items with a fraction', () => {
    const { instance } = construct({});

    const cycles = [{
      _id: 1,
      press: 100,
    },{
      _id: 2,
      press: 90,
    }];

    const next = instance.decorateCycles(cycles[0], 0, cycles);

    expect(next._id).toEqual(1);
    expect(next.press_fraction).toEqual(10); // 10%
  });

  it('should decorate items with a fraction', () => {
    const { instance } = construct({});

    const cycles = [{
      _id: 1,
      press: 90,
    },{
      _id: 2,
      press: 100,
    }];

    const next = instance.decorateCycles(cycles[0], 0, cycles);

    expect(next._id).toEqual(1);
    expect(next.press_fraction).toEqual(-11); // 10% - TODO - seems off a bit
  });

  it('should sort and decorate cycles', () => {
    const items = [{
      _id: 1,
      press: 100,
      date: '2018-01-01'
    },{
      _id: 2,
      press: 105,
      date: '2018-02-01'
    }, {
      _id: 3,
      press: 95,
      date: '2018-03-01'
    }];

    const { instance } = construct({ items });

    const sorted = instance.getSortedItems();

    expect(sorted.map(i => i._id)).toEqual([3,2,1]);
    expect(sorted.map(i => i.press_delta)).toEqual([-10,5,undefined]);
  });

  it('should navigate to cycle when the row is clicked', () => {
    const items = [{
      _id: 1,
      press: 100,
      date: '2018-01-01'
    }];

    const history ={ 
      push: jest.fn()
    };

    const { wrapper } = construct({ items, history });

    const row1 = wrapper.find('#cycle__1');

    row1.simulate('click');

    expect(history.push).toHaveBeenCalledWith(`/cycles/1`);
  });
});
