import Axios from 'axios';
import * as config from '../../config.json';
import { YoutubeService } from '../../services';
import { fakeTrendingResponse, fakeStadistics } from '../fakeVideo';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Youtube service unit test', () => {
    let axios = {};
    const trendingVideos = {
        part: 'snippet',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: '24',
        key: config.youtubeApi.key
    };
    const stadistics = {
        part: 'statistics',
        id: '123',
        key: config.youtubeApi.key
    };

    before(() => {
        axios.get = sinon.stub();
        axios.get.withArgs('/', { params: trendingVideos }).returns(Promise.resolve(fakeTrendingResponse));
        axios.get.withArgs('/', { params: stadistics }).returns(Promise.resolve(fakeStadistics));

    })
    it('should return the trending videos with format', (done) => {
        const country = 'US';
        const youtubeService = new YoutubeService(axios);
        const videoInfoExpected = {
            id: '123',
            title: 'Drake - In My Feelings',
            thumbnail: 'https://i.ytimg.com/vi/DRS_PpOrUZ4/hqdefault.jpg',
            publishedAt: '3 days ago',
            viewCount: '12356485',
            likeCount: '1049665'
        };
        youtubeService.getTrendingVideos(country).then(videoInfo => {
            const firstVideo = videoInfo[0];
            expect(videoInfoExpected).to.deep.equal(firstVideo);
            done();
        }).catch(done);

    });
});