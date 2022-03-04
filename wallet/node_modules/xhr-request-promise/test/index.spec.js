const nock = require('nock')
const request = require('../')

const error = require('./fixtures/error')
const photo = require('./fixtures/photo')

const MOCK_URL = 'https://jsonplaceholder.typicode.com'
const VALID_ENDPOINT = '/photos/1'
const INVALID_ENDPOINT = '/photos/2'

describe('xhr-request-promise', () => {
  beforeAll(() => {
    nock(MOCK_URL)
      .get(VALID_ENDPOINT)
      .reply(200, photo)

    nock(MOCK_URL)
      .get(INVALID_ENDPOINT)
      .reply(404, error)
  })

  it('Should return response for a successful request', async () => {
    const actual =
      await request(`${MOCK_URL}${VALID_ENDPOINT}`)
        .then(JSON.parse)

    const expected = photo

    expect(actual).toEqual(expected)
  })

  it('Should return response for a failed request', async () => {
    const actual =
      await request(`${MOCK_URL}${INVALID_ENDPOINT}`)
        .then(JSON.parse)

    const expected = error

    expect(actual).toEqual(expected)
  })
})
