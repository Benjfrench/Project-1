let postsData;

fetch('https://api.sampleapis.com/simpsons/episodes')
  .then((response) => response.json())
  .then((json) => {
    postsData = json;
    renderPosts(postsData); // Call the function to render posts
  });

function renderPosts(posts) {
  const row = document.getElementById('posts-row');
  row.innerHTML = ''; // Clear existing cards

  posts.forEach(post => {
    const postTemplate = document.querySelector('#card-template').content.cloneNode(true);
    const postImg = postTemplate.querySelector('.card-img-top');
    const postTitle = postTemplate.querySelector('.card-title');
    const postSeasonEpisode = postTemplate.querySelector('.card-season-episode');
    const postRating = postTemplate.querySelector('.card-rating');
    const postDescription = postTemplate.querySelector('.card-description');

    postImg.src = post.thumbnailUrl;
    postTitle.textContent = post.name;
    postSeasonEpisode.textContent = `Season ${post.season}, Episode ${post.episode}`;
    postRating.textContent = `Rating: ${post.rating}`;
    postDescription.textContent = post.description;

    row.appendChild(postTemplate);
  });
}

document.getElementById('seasonFilter').addEventListener('change', function() {
  const selectedSeason = this.value;
  let filteredPosts;
  if (selectedSeason === 'all') {
    filteredPosts = postsData;
  } else {
    filteredPosts = postsData.filter(post => post.season == selectedSeason);
  }
  renderPosts(filteredPosts);
});


function filterPosts() {
    const selectedSeason = seasonFilter.value;
    const minRating = parseFloat(ratingFilter.value) || 0;
    let filteredPosts = postsData;

    if (selectedSeason !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.season == selectedSeason);
    }

    filteredPosts = filteredPosts.filter(post => post.rating >= minRating);

    renderPosts(filteredPosts);
  }

  seasonFilter.addEventListener('change', filterPosts);
  ratingFilter.addEventListener('input', filterPosts);


