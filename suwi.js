fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v2/all');
    const myJson = await response.json(); 
    let datax = [...myJson];
    console.log("my country",myJson);

    localStorage['jsonData'] = JSON.stringify(myJson);
   
    const pagination= document.getElementById("pagination");
    let current_page = 1;
    let column = 9;
    
  
  function Display_elements(myJson, listbox, column, page){
    listbox.innerHTML="";
    page--;
    let start = page * column;
    let end = start + column;
    for(let i= start;i<end;i++){
        console.log("my",myJson[i]);
        const div = document.createElement('div');
        div.classList.add('country-item');

        const img = document.createElement('img');
        img.classList.add('flag');
        img.setAttribute('src', myJson[i].flag);
        img.setAttribute('alt', "flag-img");

        const h3 = document.createElement('h3');
        h3.textContent = myJson[i].name;

        var li_list = ["Population", "Region", "Capital"];
        var li_values = [myJson[i].population, myJson[i].region, myJson[i].capital];

        const ul = document.createElement('ul');

        for (var j = 0; j < li_list.length; j++) {
            const li = document.createElement('li');
            li.textContent = li_list[j] + ": " + li_values[j];
            ul.appendChild(li);
        }


        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(ul);

        div.addEventListener('click', function (e) {
            displayCountryDetails(e, myJson);
        })

        var c_box = document.getElementById('list');
        c_box.appendChild(div);

       
    }
    console.log(c_box);
      }    

      function SetupPagination(myJson, paginationbox, column){
        let pageCount = Math.ceil(myJson.length/column);
        console.log(pageCount)
        for(let i=1;i<pageCount+1;i++){
        let btn = PaginationButton(i, myJson);
        paginationbox.append(btn);
        btn.style.height="39px";
        btn.style.width="39px";
        }
        
        }

        function PaginationButton(page, myJson ){
            let button = document.createElement("button");
            button.innerText = page;
            button.style.backgroundColor = " hsl(207, 26%, 17%)";
            button.style.color="white";
            button.style.alignItems="center";
            
            
            button.addEventListener("click", function(){
            current_page = page;
            Display_elements(datax, list, column, current_page);
            
            
            
            })
            return button;
            }

            Display_elements(datax, list, column, current_page)
            SetupPagination(datax,pagination,column)
}

fetchCountries();
const search = document.forms['input-form'].querySelector('input');
search.addEventListener('keyup', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const countries = document.getElementsByTagName('h3');

    document.getElementById('regions').selectedIndex = 0;

    Array.from(countries).forEach(function (country) {
        if (country.innerText.toLowerCase().indexOf(searchTerm) != -1) {
            country.parentElement.style.display = "block";
        } else {
            country.parentElement.style.display = "none";
        }
    })
})


function selectRegions() {
    const list = document.getElementById('regions');

    document.getElementById('search').value = "";

    const selected_region = list.options[list.selectedIndex].text.toLowerCase();

    const regions = document.getElementsByTagName('li');

    for (var i = 1; i < regions.length; i += 3) {
        if (regions[i].innerText.toLowerCase().indexOf(selected_region) != -1) {
            regions[i].parentElement.parentElement.style.display = "block";
        } else {
            regions[i].parentElement.parentElement.style.display = "none";
        }
    }

    console.log(list);
}
function toggleTheme() {

    var currentTheme = document.documentElement.getAttribute('data-theme');
    var text = document.getElementById('dark-mode-text');

    if (currentTheme === 'light') {
        targetTheme = 'dark';
        text.innerText = "Light Mode";
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'sunny-outline');
    } else if (currentTheme === 'dark') {
        targetTheme = 'light';
        text.innerText = "Dark Mode";
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'moon-outline');
    }

    document.documentElement.setAttribute('data-theme', targetTheme);

}



function displayCountryDetails(e, myJson) {
    

    var main = document.getElementsByClassName('main');
    var section = document.getElementsByClassName('details-section');

    if (e.target.tagName === "IMG" || e.target.tagName === "H3" || e.target.tagName === "UL") {
        var parent = e.target.parentElement;
        var children = parent.children;
        main[0].style.display = "none";
        section[0].style.display = "block";

        setData(myJson, children, section, false);

    } else if (e.target.tagName === "LI") {
        var parent = e.target.parentElement.parentElement;
        var children = parent.children;
        main[0].style.display = "none";
        section[0].style.display = "block";

        setData(myJson, children, section, false);

    }
}

function setData(myJson, children, section, recursion) {
    debugger
    var textgrid = document.getElementsByClassName('text-grid');
    textgrid[0].style.display = "grid";
    for (var i = 0; i < myJson.length; i++) {
        if (myJson[i].name.toLowerCase() === (recursion ? children.toLowerCase() : children[1].innerText.toLowerCase())) {
            section[0].querySelectorAll('h3')[0].innerText = myJson[i].name;
            section[0].querySelectorAll('img')[0].src = myJson[i].flag;
            section[0].querySelectorAll('img')[0].alt = "flag-image";
            section[0].querySelectorAll('.native-name')[0].innerText = myJson[i].nativeName;
            section[0].querySelectorAll('.region')[0].innerText = myJson[i].region;
            if(myJson[i] && myJson[i].capital){
                section[0].querySelectorAll('.capital')[0].innerText = myJson[i].capital;
            }else{
                section[0].querySelectorAll('.capital')[0].innerText = "";
            }
            
            if(myJson[i] && myJson[i].currencies){
                section[0].querySelectorAll('.currencies')[0].innerText = myJson[i].currencies[0].name;
            }else{
                section[0].querySelectorAll('.currencies')[0].innerText = "";
            }     
            section[0].querySelectorAll('.population')[0].innerText = myJson[i].population;
            section[0].querySelectorAll('.sub-region')[0].innerText = myJson[i].subregion;
            section[0].querySelectorAll('.languages')[0].innerText = myJson[i].languages[0].name;
        }
    }
}                 
function back() {
const main = document.getElementsByClassName('main');
const section = document.getElementsByClassName('details-section');

section[0].style.display = "none";
main[0].style.display = "block";

}
  