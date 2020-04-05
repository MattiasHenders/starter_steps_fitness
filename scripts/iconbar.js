//Toggles active status for icon bar.
var menus = document.getElementsByTagName('a');
for (var i = 0; i < menus.length; i++) {
    menus[i].addEventListener("click", function(){
        for (var i = 0; i < menus.length; i++) {
            menus[i].classList.remove("active");
        }
        this.classList.toggle("active");
    });
}