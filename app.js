const container = document.getElementById('container');
const loading = document.querySelector('.loader');

let limit = 8;
let page = 1;



async function getPosts() {
	const res = await fetch(`http://localhost:3000/posts?_limit=${limit}&_page=${page}`);
	
	const data = await res.json();

	return data;
}

async function showPosts() {
	const posts = await getPosts();

	posts.forEach(post => {
		const postEl = document.createElement('div');
		postEl.classList.add('post');
		postEl.innerHTML = `
		<div class="number"><img src="${post.profile_image}"></div>
		<div class="post-title"><p>${post.date}</p></div>
		<div class="name"><p >${post.name}</p></div>
		<div class="logo">
                    <img class="instagram-logo" src="../icons/icons/instagram-logo.svg">
                </div>
		<div class="post-image"><img src="${post.image}"></div>
		<div class="post-info">
			<p class="post-body"> <span>#hello </span>${post.caption}</p>
		</div>
		<div class="line"></div>
		<div class="heart">
                <img class="instagram-logo" src="../icons/icons/heart.svg">
        </div>
		<div class="likes">
            <p>${post.likes}</p>
         </div>
		`;

		container.appendChild(postEl);
	});
}

//Show Loader and fetch more posts
function showLoading() {
	loading.classList.add('show');
	
	setTimeout(()=>{
		loading.classList.remove('show');

		setTimeout(() => {
			page++;
			showPosts();
		}, 300);

	}, 1000);
}


showPosts();

window.addEventListener('scroll', () => {
 	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	 if(scrollTop + clientHeight >= scrollHeight - 5) {
		 showLoading();
	 }
});
