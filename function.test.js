const functions = require('./function')

//snap shot test will be available un react u can update npm test -- -u

test('toBe Called', () => {    
    //const fn = jest.fn((x,y) => x+ y)
    const fn = jest.fn(functions.add)
    expect(fn(2,3)).toBe(5)
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(2,3)
    expect(fn).toBeCalled()
    //expect(fn).not.toBeCalled()
    expect(fn).toHaveBeenLastCalledWith(2,3)
    expect(fn).toHaveReturnedTimes(1)
    expect(fn).toHaveReturnedWith(5)
    expect(fn).toHaveLastReturnedWith(5)
 
})

test('toBe equal', () => {
    expect(functions.add(2,2)).toBe(4)
})

test('toBe not equal', () => {
    expect(functions.add(2,2)).not.toBe(5)
})

test('should be null', () => {
    expect(functions.isNull()).toBeNull()
})

test('should be falsy', () => {
    expect(functions.checkValue(0)).toBeFalsy() //exectutes for 0,null,undefined , for truthy .not.toBeFalsy()
})

test('should be truthy', () => {
    expect(functions.checkValue(true)).toBeTruthy() //not exectutes for 0, fasle, etc,,  , for truthy .not.toBeFalsy()
})

test('should be Object', () => {
    expect(functions.createUser()).toEqual({
        firstName: 'js',
        lastName: 'jest'
    })
})

test('to be less than ', () => {
    expect(functions.add(500, 400)).toBeLessThan(1000) //toBeLessThanOrEqual
})

test('to check the Regex', () => {
    expect('team').not.toMatch(/I/) 
})

test('to check the array ', () => {
    const names = ['user', 'test', 'admin']
    expect(names).toContain('admin')
})


test('check the reverse works or not', () => {
    expect(functions.reverseString('hello')).toEqual('olleh')
})

// Working with async data

// Promise
/* test('User fetched name should be Leanne Graham', () => {
  expect.assertions(1);
  return functions.fetchUser().then(data => {
    expect(data.name).toEqual('Leanne Graham');
  });
}); */

// Async Await
/* test('User fetched name should be Leanne Graham', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toEqual('Leanne Graham');
  }); */

