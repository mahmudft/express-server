const assert = require('assert');
const {} = require("mocha")

describe('Api Auth test', () =>{

    before(() => {
        console.log("Before")

    })

    after(() => {
        console.log("after")

    })

    beforeEach(() => {
        console.log("BeforeEach")
    })

    afterEach(() => {
        console.log("AfterEach")
        
    })

    describe('Test Stripe', () => {
        it('test strict equal', () =>{
            assert.strictEqual(5, "5")
        })
    })


    it('Test if 5 = 5 ', () =>{
        assert.equal(5, 5)
    })
})

