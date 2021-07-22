const emptyArray:any[] = [];  

const recommendations = {
  valid : {
    name: "Test recommendation",
    genresIds: [1, 2],
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  wrongType: emptyArray,
  missingProps: {},
  emptyProps: {
    name: "",
    genresIds: emptyArray,
    youtubeLink: ""
  },
  genreIdNotRegistered:{
    name: "Test recommendation",
    genresIds: [1, 2147483647],
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  linkNotFromYoutube:{
    name: "Test recommendation",
    genresIds: [1, 2147483647],
    youtubeLink: "https://www.globo.com/"
  }
};

export default recommendations;