const subject = document.getElementById('subject').value.trim();
const button = document.getElementById('btn');
const bookSpace = document.querySelector('.books');

button.addEventListener('click', () => {
    getSubject();
})

async function getSubject() {
    axios.get(`http://openlibrary.org/subjects/${subject.toLowerCase()}.json`)
    .then((data) => displayBooks(data.works))
    .catch((err) => console.log(err))
}

const displayBooks = (works) => {
    bookSpace.innerHTML = '';
    const books = works.sort(() => 0.5 - Math.random()).slice(0, 5);

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book');
        const coverImgURL = book.cover_id ? `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` : './src/img/placeholder.png';

        bookCard.innerHTML = `
            <img src="${coverImgURL}" alt="${book.title}">
            <p class="book-title">Title: ${book.title}</p>
            <p class="book-author">Author: ${book.authors.map(author => author.name).join(', ')}</p>
        `;
        bookSpace.appendChild(bookCard);
    });
}

axios.get('http://openlibrary.org/works/OL8193508W.json')
.then((res) => console.log(res))
.catch((err) => console.log(err))