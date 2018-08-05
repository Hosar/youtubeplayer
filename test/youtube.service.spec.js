import Axios from 'axios';
import * as config from '../config.json';
import { YoutubeService } from '../services';
import { fakeVideo } from './fakeVideo';
import { expect } from 'chai'

describe.only('Youtube service', () => {
    let axios;
    before(()=> {
          axios = Axios.create({
            baseURL: config.youtubeApi.endpoint
          });
    })
    it('should return the trending videos with format', (done) => {
        const youtubeSerive = new YoutubeService(axios);
        youtubeSerive.getTrendingVideos('US').then(videosTrending => {
            console.log('videosTrending .....:');
            console.dir(videosTrending);
            // expect(videosTrending.data.items.length).to.greaterThan(0);
            // expect(true).to.be.true;
            done();
        }).catch(done);
    });
    
    it('should return the trending videos for US', (done) => {
        const youtubeSerive = new YoutubeService(axios);
        youtubeSerive.getVideosByCountry('US').then(videosTrending => {
            console.log('videosTrending .....:');
            // console.dir(videosTrending.data.items);
            console.dir(videosTrending.data.items[0].snippet.thumbnails);
            expect(videosTrending.data.items.length).to.greaterThan(0);
            // expect(true).to.be.true;
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
            publishedAt: '2 days ago'
        };
        console.log(videoInfo);
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
            console.log(videosWithDetails);
            expect(videosWithDetails).to.exist;
            done();
        })
    })
})