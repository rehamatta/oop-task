
const searchParams = location.search; // ?id=555
const params = new URLSearchParams(searchParams);
const gameID = params.get('id');
let container = ''
const loading = document.querySelector('.loading');


class getGameDetails {
    constructor(id) {
        this.id = id;
    }
    show(thumbnail, title, description, category, platform, status){
        container = `
        <div class="col-md-4">
             <figure>
                 <img src="${thumbnail}" class="w-100" alt="details image" />
             </figure>
        </div>
        <div class="col-md-8 text-white">
             <div>
                 <nav aria-label="breadcrumb">
                     <ol class="breadcrumb">
                         <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li> 
                         <li class="breadcrumb-item text-info" aria-current="page">${title}</li>
                     </ol>
                 </nav>
                 <h1 class="text-white">${title}</h1>
                 <h3 class="text-white mb-5">About ${title}</h3>
                 <p>Category: <span class="badge text-bg-info"> ${category}</span></p>
                 <p>Platform: <span class="badge text-bg-info">  ${platform}</span></p>
                 <p>Status: : <span class="badge text-bg-info"> ${status}</span></p>
                 <p>${description}</p>
             </div>
         </div>
         `;
         document.getElementById('detailsData').innerHTML = container;
         const backgroundPhoto = thumbnail.replace('thumbnail', 'background');
         document.body.style.backgroundImage = `url(${backgroundPhoto})`;
         document.body.style.backgroundSize = 'cover';
         document.body.style.backgroundPosition = 'center';
    }
async getAllGamesData() {
    loading.classList.remove('d-none');
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
            'x-rapidapi-key': '8980bec251mshe1ffd2f17ced7d9p116befjsnfa7697e6d297'
        }
    })
    if(response.ok) {
        const data = await response.json();
        this.show(data.thumbnail, data.title, data.description, data.genre, data.platform , data.status);
        loading.classList.add('d-none');
    }
  }
}


const obj1 = new getGameDetails(gameID);
obj1.getAllGamesData();