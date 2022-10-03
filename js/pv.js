var listCount = document.querySelectorAll("div.list-elem").length, lookUp = true,lastPage = 1, page = 2;
function loadMore() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var lastListCount = listCount;
    var data = JSON.parse(this.responseText);
    var elem = document.getElementById("listing");
    var time = Math.floor(Date.now()/1000);
    for (const i in data.nodes) {
        var diff = time -data.nodes[i].node.last_update;
        var h = Math.floor(diff/3600);
        var d = h > 23 ? Math.floor(h/24) : 0;
        var m = h < 0 ? Math.floor(diff/60) : 0;

        elem.innerHTML = elem.innerHTML + '<div class="list-elem row justify-content-end flex-center-start"> <div class="col-xl-4"> <img class="img lazy" src="" data-src="'+data.nodes[i].node.ImageStyle_thumbnail+'" style="width: 100%;" /> </div> <div class="col-xl-8"> <div class="row"> <div class="col-lg-12 col-md-12"> <div class="section-tittle"> <p>'+data.nodes[i].node.title+'</p> </div> <div class="time">'+(d > 0 ? d+' DAYS': (h > 0 ? h+' HOURS': m+' MINUTES'))+' AGO </div> </div> </div> </div> </div>';
    }
    listCount = document.querySelectorAll("div.list-elem").length;
    lookUp == lastListCount == listCount ? false : true;
    page++;
    lazyLoadImages();
  }
  xhttp.open("GET", "https://englishapi.xynie.com/app-api/v1/photo-gallery-feed-page/page/"+page);
  xhttp.send();
}

function getScrollPos() {
    var scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) { //Netscape compliant
        scrOfY = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) { //DOM compliant
        scrOfY = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) { //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
    }
    return scrOfY;
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

document.addEventListener("scroll", function (event) {
    if (getDocHeight() - 100 <= getScrollPos() + window.innerHeight && lookUp && page > lastPage){
        lastPage = page;
        loadMore();
    }
});

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const img = entry.target;
    if (img.src != img.getAttribute('data-src')) {
        img.classList.remove("lazy");
        img.src = img.getAttribute('data-src');
        imgObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.01
});

function lazyLoadImages(){
    document.querySelectorAll('img.lazy').forEach((img) => {
        imgObserver.observe(img);
    });
}

lazyLoadImages();

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}
