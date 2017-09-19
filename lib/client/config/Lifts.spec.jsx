import Lifts from './Lifts'

describe('Lifts', () => {
  it('should return lift names', () =>{
    expect(Lifts.getLiftNames()).toEqual([
      'press',
      'squat',
      'bench',
      'deadlift',
    ])
  });
});
