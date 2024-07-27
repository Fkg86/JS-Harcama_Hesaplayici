const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");

/* izleme islemleri */
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

//toplam state(durum)
let toplam = 0;

function updateToplam(fiyat) {
  toplam += parseInt(fiyat);
  toplamBilgi.innerText = toplam;
}

/* harcama olusturma */

function addExpense(e) {
  e.preventDefault();

  if (!fiyatInput.value || !harcamaInput.value) {
    alert("Formlari uygun sekilde doldurunuz");
    return;
  }

  //div olusturma
  const harcamaDiv = document.createElement("div");

  //class ekleme
  harcamaDiv.classList.add("harcama");
  if (statusCheck.checked === true) {
    harcamaDiv.classList.add("payed");
  }

  //icerigini ayarlama
  harcamaDiv.innerHTML = `
            <h2>${harcamaInput.value}</h2>
            <h2 id='value'>${fiyatInput.value}</h2>
            <div class="buttons">
                <img id='payment'src="images/pay.png" />
                <img id='remove'src="images/remove.png" />
            </div>
            `;
  // listenin sonuna ekleme(olusan harcamayi htmle gönderme)
  liste.appendChild(harcamaDiv);

  //toplami güncelle
  updateToplam(fiyatInput.value);

  //formu temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

//listeye tiklanma
function handleClick(e) {
  //tiklanilan elamani alma
  const eleman = e.target;

  if (eleman.id === "remove") {
    //tiklanilan sil butonunun kapsayicisini alma
    const kapsayiciEleman = eleman.parentElement.parentElement;

    //silinen elemanin fiyatini alma
    const deletedPrice = kapsayiciEleman.querySelector("#value").innerText;

    //silinen ürünün fiyatini toplamdan cikarma
    updateToplam(-Number(deletedPrice));

    //kapsayiciyi html den kaldirma
    kapsayiciEleman.remove();
  }
}

//filtreleme islemi
function handleFilter(e) {
  const items = liste.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if(!item.classList.contains('payed')){
          item.style.display = "none";
        }else{
          item.style.display='flex';
        }
        
        break;

      case "not-payed":
        if(item.classList.contains('payed')){
          item.style.display='none'
        }else{
          item.style.display='flex' 
        }
        break;
    }
  });
}
