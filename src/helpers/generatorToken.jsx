const generatorToken = () => {
  const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let i = 0;
  let token = ''
  while (i < 20) {
    token += string[Math.floor(Math.random() * string.length)]
    i++
  }
  return token
}

export default generatorToken
