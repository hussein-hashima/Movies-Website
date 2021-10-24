let all = [];
let regx;
let password;


async function getData(category) {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR02cw8Bod5ygKnPXULM2EdoQGvPE8l-sXUkbF30E1JyLywPURBS6TlyBPE`);
    let allResults = await response.json();
    all = allResults.results;
    console.log(all);
    displayAllposts(all);
}
async function getTrending() {
    let response = await fetch(`
https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR02cw8Bod5ygKnPXULM2EdoQGvPE8l-sXUkbF30E1JyLywPURBS6TlyBPE`);
    let allResults = await response.json();
    all = allResults.results;
    console.log(all);
    displayAllposts(all);
}
async function search(keyword) {
    let response = await fetch(`
    https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR02cw8Bod5ygKnPXULM2EdoQGvPE8l-sXUkbF30E1JyLywPURBS6TlyBPE&language=en-US&query=${keyword}&page=1&include_adult=false`);
    let allResults = await response.json();
    all = allResults.results;
    console.log(all);
    displayAllposts(all);
}
getData("now_playing");

function displayAllposts(Arr) {
    let allPosts=Arr;
    
    let content = ``;
    for (var i = 0; i < allPosts.length; i++) {
        content += `  <div class="col-md-6 col-lg-4 my-3 myM  shadow">
        <div class="movie shadow rounded position-relative">
            <div class="post">
                <img src="https://image.tmdb.org/t/p/w500${allPosts[i].poster_path}"
                    class="img-fluid rounded">
                <div class="layer d-flex align-items-center ">
                    <div class="info p-0">

                        <h2>${allPosts[i].title}</h2>
                        <p>${allPosts[i].overview}</p>
                        <p>rate: ${allPosts[i].vote_average}</p>
                        <p>${allPosts[i].release_date}</p>

                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }
    document.getElementById('rowData').innerHTML = content;
}


$(".link a").click(function (e) {
    console.log(e.target.text);
    let cate = e.target.text;
    if (cate == "Popular") {
        $("html, body").animate({
            scrollTop: 0
        }, 300, () => {
            getData("popular");
        });

    } else if (cate == "Top Rated") {
        $("html, body").animate({
            scrollTop: 0
        }, 300, () => {
            getData("top_rated");
        });

    } else if (cate == "Now Playing") {
        $("html, body").animate({
            scrollTop: 0
        }, 300, () => {
            getData("now_playing");
        });

    } else if (cate == "Upcoming") {
        $("html, body").animate({
            scrollTop: 0
        }, 300, () => {
            getData("upcoming");
        });

    } else if (cate == "Trending") {
        $("html, body").animate({
            scrollTop: 0
        }, 300, () => {
            getTrending();
        });

    } else if (cate == "Contact Us") {
        let linkOffest = $("#contactUs").offset().top;
        console.log(linkOffest);
        $("html, body").animate({
            scrollTop: linkOffest
        }, 300);
    }
});
$(".toggleBtn").click(function () {
    if ($(".menu").css("left") == "-240px") {
        $(".menu").css("left", "0px");
        $(".strip").css("left", "240px");
        $(".toggleBtn .fas").toggleClass('fa-bars fa-times');
        $(".link a").animate({marginTop:15},1000);
    } else {
        $(".menu").css("left", "-240px");
        $(".strip").css("left", "0px");
        $(".toggleBtn .fas").toggleClass('fa-times fa-bars');
        $(".link a").animate({marginTop:700},1000);

    }


});
// Search

$("#allMovies").keyup(function (e) {
    if (e.target.value == "") {
        getData("now_playing");
    } else {
        console.log(e.target.value);
        search(e.target.value);
    }

});

$("#word").keyup(function (e) {
    console.log(e.target.value);
    let x=e.target.value;
    console.log(x.toUpperCase());
    let newArr = all.filter(function (e) {
        return e.title.includes(x.toLowerCase())||e.title.includes(x.toUpperCase()); 
    });
    console.log(newArr);
    displayAllposts(newArr);

});

$("#userName").keyup(function(e){
    regx=/^([a-z]|[A-Z]){3,10}$/;
    let x=e.target.value;
    console.log(regx.test(x));
    if(regx.test(x) == false){
        console.log(x);
        $('.errorMsg').eq(0).css("visibility","visible");
    }
    else{
        $(".errorMsg").eq(0).css("visibility","hidden");
    }
});
$("#userEmail").keyup(function(e){
    regx=/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/;
    let x=e.target.value;
    console.log(regx.test(x));
    if(regx.test(x) == false){
        console.log(x);
        $('.errorMsg').eq(1).css("visibility","visible");
    }
    else{
        $(".errorMsg").eq(1).css("visibility","hidden");
    }
});
$("#userPassword").keyup(function(e){
    regx=/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;
    password=e.target.value;
    console.log(regx.test(password));
    if(regx.test(password) == false){
        console.log(password);
        $('.errorMsg').eq(4).css("visibility","visible");
    }
    else{
        $(".errorMsg").eq(4).css("visibility","hidden");
    }
});
$("#rePassword").keyup(function(e){
    if(password != e.target.value){
        $('.errorMsg').eq(5).css("visibility","visible");
    }
    else{
        $(".errorMsg").eq(5).css("visibility","hidden");
    }
});
$("#userAge").keyup(function(e){
    regx=/[1-9][0-9]$/;
    let x=e.target.value;
    console.log(regx.test(x));
    if(regx.test(x) == false){
        console.log(x);
        $('.errorMsg').eq(3).css("visibility","visible");
    }
    else{
        $(".errorMsg").eq(3).css("visibility","hidden");
    }
});
$("#userPhone").keyup(function(e){
    regx=/\d{3}\s?\d{4}-?\d{4}$/;
    let x=e.target.value;
    console.log(regx.test(x));
    if(regx.test(x) == false){
        console.log(x);
        $('.errorMsg').eq(2).css("visibility","visible");
    }
    else{
        $(".errorMsg").eq(2).css("visibility","hidden");
    }
});

