function deleteAllFilter(){
    var list = document.getElementById('filter-list');
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
}