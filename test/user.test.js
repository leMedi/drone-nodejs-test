'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/index').app
const should = chai.should()

chai.use(chaiHttp)

describe('Users', () => {
  let user = {
    email: 'mehdi13@elhaij.com',
    password: 'mehdi@elhaij.com',
    name: 'mehdi@elhaij.com',
  }
  it('Create User', (done) => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
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
