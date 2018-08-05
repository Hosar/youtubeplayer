import Axios from 'axios';
import express from 'express';
import * as config from '../config.json';
import { YoutubeService } from '../services/youtube';

const router = express.Router();
const axios = Axios.create({
  baseURL: config.youtubeApi.endpoint
});

const service = new YoutubeService(axios);

/* GET home page. */
router.get('/', async (req, res) => {
  // const trends = await service.getTrendingVideos();
  console.log('-------------------ENTERRR');
  res.render('youtube/index', {
    title: config.title,
    countryList: config.countryList,
    // videos: trends
  });
});

router.get('/:videoId', async (req, res) => {
  res.render('youtube/player', {
    title: config.title
  });
});

module.exports = router;
