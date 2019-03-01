'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/index').app
const should = chai.should()
const uniqid = require('uniqid');
chai.use(chaiHttp)

describe('Users', () => {
  const id = uniqid('user')
  let user = {
    email: id + '@test.com',
    password: 'helloWorld',
    name: 'testuser-' + id,
  }
  it('Create User', (done) => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        console.log(res)
        res.should.have.status(201)
        res.body.should.have.property('id')
        res.body.should.have.property('createdAt')
        res.body.should.have.property('email').eq(user.email)
        res.body.should.have.property('name').eq(user.name)
        res.body.should.have.property('role').eq('user')
        done(err)
      })
  })

})
