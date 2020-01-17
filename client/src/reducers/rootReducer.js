const initState={
  post:null
}
const rootReducer=(state=initState,action)=>{
  if(action.type=='ADD')
  return {post:action.post};
  return state;
}
export default rootReducer;
