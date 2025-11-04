const input = document.querySelector("#input");
const btn = document.querySelector("#btn")
const list = document.querySelector("#list");

btn.addEventListener("click", (e)=>{
    e.preventDefault();
    list.innerHTML = ""; //limpa a pagina sempre que o botão é clicado

    console.log("clicked !")
    async function getBook(){
        try{
            //a api só disponibiliza 100 livros por chamado...
            const res = await fetch(`https://openlibrary.org/search.json?q=${input.value}`); //usa o input do usuario para fazer buscas na API
            const parsed = await res.json();
            let bookList = parsed.docs; //docs é a informação disponibilizada pela API que é relevante ao usuario 
            
            console.log(bookList);

            //manda livros mais antigos para o topo da pagina e mais novos pra baixo
            bookList.sort((a, b) => (a.first_publish_year || 9999) - (b.first_publish_year || 9999));

            for(let i=0; i<bookList.length; i++){
                const title = bookList[i].title;
                const author = bookList[i].author_name;
                const pubYear = bookList[i].first_publish_year

                console.log(title);
                console.log(author);
                console.log(pubYear)

                const book = document.createElement("h2");
                const bookSub = document.createElement("p")

                book.className = "cssTitle";

                const bookTitle = document.createTextNode(title);
                const bookAuth = document.createTextNode(author);
                const bookPub = document.createTextNode(pubYear);
                const unknown = document.createTextNode("Unknown Author/Publisher");
                const space = document.createTextNode(" --- ");
                
                book.appendChild(bookTitle);
                if(bookAuth.textContent != "undefined"){
                    bookSub.appendChild(bookAuth);
                }
                else{
                    bookSub.appendChild(unknown);
                }

                if(bookPub.textContent != "undefined" && bookPub.textContent != 0){
                    bookSub.appendChild(space);
                    bookSub.appendChild(bookPub);
                }

                list.appendChild(book);
                list.appendChild(bookSub)

            }
        }
        catch(err){
            console.log(err);

            const error = document.createElement("h2");
            const subErr = document.createElement("p");
            const errorTxt = document.createTextNode("Error !")
            const subErrTxt = document.createTextNode("The item you were searching for doesn't exist, please try again !");

            error.appendChild(errorTxt)
            subErr.appendChild(subErrTxt);

            list.appendChild(error);
            list.appendChild(subErr);
        }
    }
    getBook();
});