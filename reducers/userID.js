export default function (userID='', action){
    if (action.type === 'addUserID'){
        console.log(action.userID)
        return action.userID
    }else {
        return userID
    }
}