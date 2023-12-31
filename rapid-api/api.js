//search for an artist
const axios = require("axios");
const base = "https://spotify23.p.rapidapi.com";

const searchArtist = async (artistName, limit) => {
  const options = {
    method: "GET",
    url: `${base}/search/`,
    params: {
      q: artistName,
      type: "artists",
      limit,
      numberofTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "",
    },
  };

  try {
    const res = await axios.request(options);
    return _createResponseObjectForArtist(res.data.artists.items,artistName);
  } catch (error) {
    console.error(error);
  }
};

const _createResponseObjectForArtist = (res, artistName) => {
  const object = { searchTerm: artistName, results: [] };
  res.forEach((element) => {
    const id = element.data.uri.replace("spotify:artist:", "");
    displayObject = { display: element.data.profile.name, id};
    object.results.push(displayObject);
  });
  return object
};

const artistOverView = async (id, limit) => {
  const options = {
    method: "GET",
    url: `${base}/artist_overview/`,
    params: {
      id,
      offset: "0",
      limit: 10,
    },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "",
    },
  };

  try {
    const res = await axios.request(options);
    return res.data.data.artist;
  } catch (error) {
    console.error(error);
  }
};

const searchTrack = async (trackName, limit) => {
  const options = {
    method: "GET",
    url: `${base}/search/`,
    params: {
      q: trackName,
      type: "tracks",
      limit,
      numberofTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "",
    },
  };

  try {
    const res = await axios.request(options);
    return res.data.tracks.items;
  } catch (error) {
    console.error(error);
  }
};

const songInfo = async (ids) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/tracks/",
    params: { ids },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "",
    },
  };
  try {
    const res = await axios.request(options);
    return res.data.tracks[0];
  } catch (error) {
    console.error(error.data);
  }
};

const searchAlbum = async (albumName, limit) => {
  const options = {
    method: "GET",
    url: `${base}/search/`,
    params: {
      q: albumName,
      type: "albums",
      limit,
      numberofTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "",
    },
  };

  try {
    const res = await axios.request(options);
    return res.data.albums.items;
  } catch (error) {
    console.error(error);
  }
};

const albumInfo = async (ids) => {
  const options = {
    method: "GET",
    url: `${base}/albums/`,
    params: { ids },
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "",
    },
  };

  try {
    const res = await axios.request(options);
    return res.data.albums;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  searchArtist,
  searchTrack,
  searchAlbum,
  artistOverView,
  songInfo,
  albumInfo,
};
