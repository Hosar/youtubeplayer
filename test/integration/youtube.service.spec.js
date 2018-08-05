import Axios from 'axios';
import * as config from '../../config.json';
import { YoutubeService } from '../../services';
import { fakeVideo } from '../fakeVideo';
import { expect } from 'chai'

describe('Youtube service', () => {
    let axios;
    before(()=> {
          axios = Axios.create({
            baseURL: config.youtubeApi.endpoint
          });
    })
    it('should return the trending videos with format', (done) => {
        const youtubeSerive = new YoutubeService(axios);
        youtubeSerive.getTrendingVideos('US').then(videosTrending => {
            expect(videosTrending.length).to.greaterThan(0);
            done();
        }).catch(done);
    });
    
    it('should return the trending videos for US', (done) => {
        const youtubeSerive = new YoutubeService(axios);
        youtubeSerive.getVideosByCountry('US').then(videosTrending => {
            expect(videosTrending.data.items.length).to.greaterThan(0);
            done();
        }).catch(done);
    });

    it('should format the video info to hold only the necessaty info', () => {
        const youtubeSerive = new YoutubeService(axios);
        const videoInfo = youtubeSerive.formatVideoItems(fakeVideo)
        const propertiesExpected = 4;
        const videoInfoExpected = {
            id: 'DRS_PpOrUZ4',
            title: 'Drake - In My Feelings',
            thumbnail: 'https://i.ytimg.com/vi/DRS_PpOrUZ4/hqdefault.jpg',
            publishedAt: '3 days ago'
        };
        const firstVideo = videoInfo[0];
        expect(Object.getOwnPropertyNames(firstVideo).length).to.equal(propertiesExpected)
        expect(firstVideo).to.deep.equal(videoInfoExpected);
    })

    it('should get the video counts', (done) => {
        const videoInfo = [{
            id: 'DRS_PpOrUZ4',
            title: 'Drake - In My Feelings',
            thumbnail: undefined,
            publishedAt: '2 days ago'
        },
        {
            id: 'xUf2-sjGqQw',
            title: 'The Secret World of Jeffree Star',
            thumbnail: undefined,
            publishedAt: '9 days ago'
        }];
        const youtubeSerive = new YoutubeService(axios);
        youtubeSerive.getDetails(videoInfo).then(videosWithDetails => {
            expect(videosWithDetails).to.exist;
            done();
        })
    })
})