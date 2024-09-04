import { nextTick } from 'vue';
import { d as createPinia, e as defineStore } from './server.mjs';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import qs from 'qs';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const api_url = "https://strapi-potr.onrender.com";
const useMusicStore = defineStore({
  id: "musicStore",
  state: () => {
    return {
      search: {
        query: "",
        results: [],
        filters: [],
        loading: false,
        error: null
      },
      interface: null,
      filters: [],
      active_filters: [],
      filter_key: 0,
      filter_option_key: 0,
      albums: [],
      artists: [],
      tracks: [],
      player: {
        track: null,
        playing: false,
        paused: false,
        selecting: false,
        track_time: "",
        elapsed: "",
        duration: "",
        volume: 0.75,
        mute: false
      },
      comp_key: 0
    };
  },
  actions: {
    // API methods:
    async init_music() {
      await this.fetch_albums();
      await this.fetch_artists();
      await this.fetch_tracks();
      await this.fetch_interface();
    },
    async fetch_albums() {
      this.albums = await fetch(`${api_url}/api/albums?${qs.stringify(
        {
          populate: [
            "title",
            "release_date",
            "artwork",
            "music_artists",
            "tracks",
            "ratings",
            "ratings.one_star",
            "ratings.two_stars",
            "ratings.three_stars",
            "ratings.four_stars",
            "ratings.five_stars"
          ]
        },
        { arrayFormat: "comma" }
      )}`).then((res) => res.json()).catch((err) => console.error(err));
    },
    async fetch_artists() {
      this.artists = await fetch(`${api_url}/api/music-artists?${qs.stringify(
        {
          populate: [
            "name",
            "bio",
            "profile_picture",
            "pictures",
            "socials",
            "socials.platform",
            "socials.link",
            "albums",
            "albums.title",
            "albums.artwork",
            "albums.release_date",
            "albums.music_artists",
            "albums.ratings",
            "tracks"
          ]
        },
        { arrayFormat: "comma" }
      )}`).then((res) => res.json()).catch((err) => console.error(err));
    },
    async fetch_tracks() {
      console.log("fetching tracks...");
      this.tracks = await fetch(`${api_url}/api/tracks?${qs.stringify(
        {
          populate: [
            "title",
            "audio_file",
            "album",
            "albums",
            "single_cover",
            "music_artists",
            "genres",
            "ratings",
            "ratings.one_star",
            "ratings.two_stars",
            "ratings.three_stars",
            "ratings.four_stars",
            "ratings.five_stars"
          ]
        },
        { arrayFormat: "comma" }
      )}`).then((res) => res.json()).catch((err) => console.error(err));
      nextTick(() => {
        this.search.results = this.tracks.data;
      });
    },
    async fetch_interface() {
      this.interface = await fetch(`${api_url}/api/music-interface?${qs.stringify({
        populate: [
          "genres",
          "artists"
        ]
      })}`).then((res) => res.json()).catch((err) => console.error(err));
    },
    reset() {
    },
    // Interface methods:
    scrub(e) {
      const audio_player2 = (void 0).getElementById("audio_player"), timeline = (void 0).getElementById("timeline"), end_width = (void 0).getComputedStyle(timeline).width, target_time = e.offsetX / parseInt(end_width) * audio_player2.duration;
      audio_player2.currentTime = target_time;
    },
    reset_scrubber() {
      const audio_player2 = (void 0).getElementById("audio_player");
      nextTick(() => {
        audio_player2.currentTime = 0;
        this.player.track_time = 0;
        this.player.elapsed = "00:00";
        this.player.duration = this.format_time(audio_player2.duration);
      });
    },
    scrub_int() {
      setInterval();
    },
    update_tracktime() {
      const audio_player2 = (void 0).getElementById("audio_player");
      nextTick(() => {
        if (this.player.playing) {
          this.scrub_int();
        } else {
          this.player.track_time = 0;
          this.player.elapsed = "00:00";
          this.player.duration = this.format_time(audio_player2.duration);
        }
      });
    },
    format_time(num) {
      let seconds = parseInt(num), minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;
      if (hours === 0)
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      else
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    },
    // User methods:
    play(track, index) {
      if (this.player.track) {
        if (this.player.track.id === track.id) {
          this.fire_play();
        } else {
          this.player.track = false;
          this.player.playing = false;
          this.player.paused = true;
          nextTick(() => {
            this.player.track = track;
            nextTick(() => {
              this.fire_play();
            });
          });
        }
      } else {
        this.player.track = track;
        nextTick(() => {
          this.fire_play();
        });
      }
    },
    pause() {
      const audio_player2 = (void 0).getElementById("audio_player");
      audio_player2.pause();
      this.player.playing = false;
      this.player.paused = true;
    },
    select_previous() {
      const target = this.player.track, prev = this.search.results.indexOf(target) - 1;
      this.player.track = false;
      nextTick(() => {
        this.player.track = this.search.results[prev] ? this.search.results[prev] : target;
        (void 0).getElementById("audio_player");
        nextTick(() => {
          this.fire_play();
        });
      });
    },
    select_next() {
      const target = this.player.track, next = this.search.results.indexOf(target) + 1;
      this.player.track = false;
      nextTick(() => {
        this.player.track = this.search.results[next] ? this.search.results[next] : target;
        const audio_player2 = (void 0).getElementById("audio_player");
        audio_player2.volume = this.player.volume;
        nextTick(() => {
          this.fire_play();
        });
      });
    },
    mute_track() {
      const audio_player2 = (void 0).getElementById("audio_player");
      this.player.mute = !this.player.mute;
      audio_player2.muted = !audio_player2.muted;
    },
    adjust_volume(e) {
      const audio_player2 = (void 0).getElementById("audio_player");
      const volume_adjuster = (void 0).getElementById("volume_adjuster");
      const volume = e.offsetX / volume_adjuster.offsetWidth;
      audio_player2.volume = volume;
      this.player.volume = volume;
    },
    doSearch() {
      if (!this.search.query.length || this.search.query.length < 2) {
        this.clearSearch();
      } else {
        this.search.results = this.tracks.data.filter((track) => {
          return track.title.toLowerCase().includes(this.search.query.toLowerCase());
        });
      }
    },
    clearSearch() {
      this.search.results = this.tracks.data;
    },
    doFilter(filter) {
      console.log("filtering by", filter);
      this.search.results = [];
      this.tracks.data.forEach((track) => {
        if (track.genres.some((genre) => genre.label.toLowerCase() === filter.label.toLowerCase())) {
          this.search.results.push(track);
          this.search.filters.push(filter);
          filter.active = true;
        }
        if (track.music_artists.some((artist) => artist.name.toLowerCase() === filter.label.toLowerCase())) {
          this.search.results.push(track);
          this.search.filters.push(filter);
          filter.active = true;
        }
      });
    },
    clearFilters() {
      console.log("clearing filters");
      this.search.results = this.tracks.data;
      this.search.filters.forEach((filter) => {
        filter.active = false;
      });
      nextTick(() => {
        this.search.filters = [];
      });
    },
    // Legacy methods:
    fire_play() {
      const audio_player2 = (void 0).getElementById("audio_player");
      nextTick(() => {
        audio_player2.volume = this.player.volume;
        audio_player2.play();
        this.player.playing = true;
        this.update_tracktime();
      });
    }
  },
  getters: {},
  persist: {
    enabled: true
  }
});

export { useMusicStore as u };
//# sourceMappingURL=music-ikm3rf6v.mjs.map
