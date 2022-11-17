let navArr = []
const navLogo = buildNavLogo(document.getElementById('main'))
const navDiv = document.getElementById('navbarToggler')


function addNavArr(title, url, active) {
    const addNAvItem = {
        title: title,
        url: url,
        active: active
    };
    navArr.push(addNAvItem);
};

// navbar items - add new here  (title, url path, active/inactive)
addNavArr('Home','index.html','active');
addNavArr('Scorecard', 'scorecard.html','active');

//code to add  navArr to pages
let navUL = document.createElement('ul')
    navUL.className = 'navbar-nav me-auto mb-2 mb-lg-0'
for (let i = 0; i < navArr.length;i++) {
    const navListItem = document.createElement('li');
        navListItem.className = 'nav-item';
    const navAnchor = document.createElement('a');
        navAnchor.className = 'navbar-link text-white p-2';
        navAnchor.href = navArr[i].url;
        navAnchor.textContent = navArr[i].title;
        if (document.getElementsByTagName('title').textContent = navArr[i].title) {
            navAnchor.ariaCurrent = 'page';
        };
    navListItem.append(navAnchor);
    navUL.append(navListItem);
}; 
navDiv.append(navUL)

//code to add and change logos -  
function buildNavLogo(parent) {
    parent.innerHTML = 'Golf Stats'
}


