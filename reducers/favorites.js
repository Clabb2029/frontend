export default function (favoritesList =[], action){
    if (action.type == 'loadList'){
        console.log(action.list)
        return action.list
    }
    else if (action.type == 'addFavorites'){
        var favoriteListCopy = [... favoritesList];
      favoriteListCopy.push(action.favorites)
        console.log(favoriteListCopy);
        return favoriteListCopy;    
    } else if (action.type == 'deleteFavorite') {
        var favoriteListCopy = [... favoritesList];
        favoriteListCopy.splice(action.position, 1)
        console.log(favoriteListCopy);
        return favoriteListCopy
    } else {
        return favoritesList;
    }
}