<h1 align="center">
  Movie App
</h1>

1.  **What Does This Movie App Do?**

    Browse the latest trending and popular movies, look at top rated movies by genre, or search for movies individually. Review trailers, cast and crew, and get recommendations with each movie.

2.  **Design Intent**

    Create API-connected website. App is a general emulation of https://reels.netlify.app/, though minor design changes were made.

    App simultaneously pulls from all endpoints via Axios, as multiple distinct calls to the TMDB API are needed. Promise.all used instead of Axios.all as it's currently rumored Axios.all will be deprecated in the near future.

    Dynamic routing used to facilitate individual movies.

3.  **Tools Used**

    - Next.js
    - Sass
    - Axios
    - TMDB API

4.  **Link**

    - [Movie App](https://bxd-movies.vercel.app/)
