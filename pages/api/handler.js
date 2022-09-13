// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * handler
 * @param {*} req
 * @param {*} res
 */
export default function handler(req, res) {
  res
    .status(200)
    .json(
      '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6yJI/o2VN7Wjv5zKYIBjDW0+6MN4pu1DIYXeWYdhNzf4kKZqaM4DYDqGeBEW544OJ+3sQd92pyYbrW1YDd4kv2jA5kOTeWDuiaY1hisXPc3Kh1mLkFryDyURMkV+orp8MTdeulgE1QNeQnxutn47OSfZgB1ycWNN2n+MJmApdA024rhUiCj6MxOJICxkW4E9rzPgOhZwjAf6isUBTSPZwRRkt6fmsJ5hbzhAAIKQhNyEwYyYxwfulRrbNvDWifB6NU4UZKoUanUElRW2WGxh161QADoqI8gTNvP6NUoyedMRyC0GjpD6kPG1hHEfI9LKt8E3fVaKrapxXuchHucH9QIDAQAB-----END PUBLIC KEY-----'
    )
}
