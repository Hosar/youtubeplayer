import * as config from '../config.json';
import moment from "moment";
import { access } from 'fs';
import { resolve } from 'url';


export class YoutubeService {

  constructor(axios) {
    this.axios = axios;
  }

  getTrendingVideos(countryCode) {    
    return this.getVideosByCountry(countryCode)
               .then(trendingVideos => trendingVideos.data.items)
               .then(this.formatVideoItems.bind(this))
               .then(this.getDetails.bind(this));
  }

  getVideosByCountry(countryCode){
    const params = {
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: countryCode, // should be replaced with country code from countryList
      maxResults: '24',
      key: config.youtubeApi.key
    };

    
    return this.axios.get('/', {params});
  }

  formatVideoItems(trendingVideos) {
    const trendingVideosInfo = [];
    for (let i = 0; i < trendingVideos.length; i++) {
      const videoInfo = {
        id: trendingVideos[i].id,
        title: trendingVideos[i].snippet.title,
        thumbnail: trendingVideos[i].snippet.thumbnails.high.url,
        publishedAt: moment(trendingVideos[i].snippet.publishedAt).fromNow()
      };
      trendingVideosInfo.push(videoInfo);      
    }
    return trendingVideosInfo;
  }

  getDetails(videosInfo) {
      const ctx = this;
      const videosWithDetails = videosInfo.map(video => {
        const getCountsDetails = (_video) => new Promise(function(resolve, reject) {
          ctx.getVideoCounts(_video.id).then(counts => {
            const videoWithCountsInfo = Object.assign({}, _video, counts) 
            resolve(videoWithCountsInfo)
          }).catch(reject);          
        })
      
        return getCountsDetails(video);
      });

      return Promise.all(videosWithDetails);
  }

  getVideoCounts(videoId) {
    const params = {
      part: 'statistics',
      id: videoId,
      key: config.youtubeApi.key
    };

    return this.axios.get('/', {params}).then(function(res) {
      const result = res.data;
      const viewCount = result['items'][0].statistics.viewCount;
      const likeCount = result['items'][0].statistics.likeCount;

      return {
        viewCount,
        likeCount
      };
    });
  }
}
