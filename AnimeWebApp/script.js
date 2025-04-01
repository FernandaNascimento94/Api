function ListItem(anime) 
{
    let item = document.createElement("li");
    item.innerText = anime;
    return item;
}
  
function carregarAnimes() 
{
    let url = "http://localhost:5000/animes";
    fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        if (data.erro) {console.log(data.erro); return;}
        if (data.animes) 
        {
            let animes = data.animes;
            let listaAnimes = document.getElementById("animes");
            listaAnimes.innerHTML = "";

            for (let i = 0; i < animes.length; i++) 
            {
                let anime = animes[i];
                listaAnimes.appendChild(ListItem(anime));
            }
        }
    });
}
  
function adicionarNovoAnime() 
{
    let novoAnime = document.getElementById("novoAnime").value;

    let request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({anime:novoAnime})
    };

    let url = "http://localhost:5000/animes/create";
    fetch(url, request)
    .then(response => response.json())
    .then(data => {
        if (data.erro) {console.log(data.erro); return;}
        if (data.status && data.status === "success") 
        {
            console.log(data.message);
            carregarAnimes();
        }
    }).catch((error)=>{console.log(error);});
}
  
function procurarAnimePelold() {
    let id = Number(document.getElementById("idBuscado").value);
    let url = "http://localhost:5000/animes/" + id.toFixed();
    fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        if (data.erro)
        {
            console.log(data.erro);
            return;
        }
        if (data.anime)
        {
            let anime = data.anime;
            let textAnimeBuscado = document.getElementById("AnimeBuscado");
            textAnimeBuscado.innerHTML = anime;
        }
    });
}
function atualizarAnimePeloId() {
    let id = Number(document.getElementById("idAtualizar").value);
    let animeNovo = document.getElementById("conteudoAtualizado").value;
    let url = "http://localhost:5000/animes/update/" + id.toFixed();
  
    let request = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anime: animeNovo }),
    };
  
    fetch(url, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          console.log(data.erro);
          return;
        }
        if (data.status === "success") {
          document.getElementById("statusAtualizacao").innerHTML = data.message;
          return;
        }
      });
  }

function deletarAnime()
{
    let id = number(document.getElementById("idDeletar").value);
    let url = "http://localhost:5000/animes/DELETE/"+id.toFixed();
    let request = {method: "DELETE"};
    fetch(url, request)
    .then(response => response.json())
    .then(data => {
        if(data.erro) { console.log(data.erro); return;}
        if(data.status === "success")
        {
            document.getElementById("statusDelecao").innerHTML = data.message;
            carregarAnimes();
            return;
        }
    });
}
