function ReloadReducer(state = false, action) {
  switch(action.type) {
    case 'LOGIN':
      return "LOGIN"
    case 'LOGOUT':
      return "LOGOUT"
    case "ADMIN":
      return "ADMIN"
    case "HOME":
      return "HOME"
    case 'DELETE':
      return action.status
    default:
      return state;
  }
}

export default ReloadReducer