let gamesData = [];
let cartona = '';
let box = '';
let displayedData;
const loading = document.querySelector('.loading');


window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    const offset = navbar.offsetTop;
    if (window.scrollY >= offset) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }
});
const navbar = document.querySelector("nav");
const navbarInitialOffset = navbar.offsetTop;

window.addEventListener("scroll", () => {
    if (window.scrollY >= navbarInitialOffset) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }
});

function showDetails(id) {
    location.href = `./details.html?id=${id}`;
}

document.querySelectorAll('.menu a').forEach((link) => {
    link.addEventListener('click',async function ()  {
        document.querySelector('.menu .active').classList.remove('active');
        this.classList.add('active');
        const category = this.getAttribute('data-category'); //or -> link.dataset.category
        const g1 = new Game(category);
        loading.classList.remove('d-none');
        gamesData = await g1.getAllGamesData();
        console.log(gamesData);
        loading.classList.add('d-none');
        for(let i=0; i<gamesData.length;i++) {
            displayedData = new DisplayData(i);
            box += displayedData.gameBox();
        }
        document.getElementById('gameData').innerHTML = box;
        box = '';
    })
});


class Game {
    constructor(category) {
        this.category = category;
    }
    async getAllGamesData() {
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com' ,
                'x-rapidapi-key': '8980bec251mshe1ffd2f17ced7d9p116befjsnfa7697e6d297'    
            }
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        }
    }
}

class DisplayData {
    constructor(index) {
        this.thumbnail = gamesData[index].thumbnail;
        this.title = gamesData[index].title;
        this.short_description = gamesData[index].short_description;
        this.genre = gamesData[index].genre;
        this.platform = gamesData[index].platform;
        this.id = gamesData[index].id;
    }
    gameBox() {
        cartona = `
            <div class="col">
            <div class="card h-100 bg-transparent" role="button" onclick="showDetails(${this.id})">
                <div class="card-body">
                    <figure class="position-relative">
                        <img class="card-img-top object-fit-cover h-100" src="${this.thumbnail}" />
                    </figure>

                    <figcaption>
                        <div class="hstack justify-content-between">
                            <h3 class="h6 small">${this.title}</h3>
                            <span class="badge text-bg-primary p-2">Free</span>
                        </div>
                        <p class="card-text small text-center opacity-50">
                            ${this.short_description.split(" ", 8).join(' ')}
                        </p>
                    </figcaption>
                </div>

                <footer class="card-footer small hstack justify-content-between">

                    <span class="badge badge-color text-white">${this.genre}</span>
                    <span class="badge badge-color text-white">${this.platform}</span>

                </footer>
            </div>
        </div>
        `;
     return cartona;
    }   
};

(async function() {
const g1 = new Game('mmorpg');
loading.classList.remove('d-none');
gamesData = await g1.getAllGamesData();
console.log(gamesData);
loading.classList.add('d-none');
for(let i=0; i<gamesData.length;i++) {
    displayedData = new DisplayData(i);
    box += displayedData.gameBox();
}
document.getElementById('gameData').innerHTML = box;
box = '';
})();