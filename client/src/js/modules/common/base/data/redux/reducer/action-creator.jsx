export default actionCreator(type, ...argNames) {
  return function(...args) {
    let action = {type};
    argNames.forEach((name, idx) => {
      action[name] = args[idx]
    });
    return action;
  }
}
