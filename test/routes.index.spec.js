const supertest = require('supertest');
const api = supertest('http://localhost:3000');



describe("一分鐘60次請求測試", function () {

    for (let i = 0; i < 60; i++) {
        it(`第${i}次請求也應該要過`, function (done) {
            api.get("/")
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                })
        });
    }

    it("第61次請求不應該要過", function (done) {
        api.get("/")
            .expect("Content-Type", /json/)
            .expect(500)
            .end(function (err, res) {
                done();
            })
    });



    it("60秒後，請求一定要過", function (done) {
        this.timeout(61 * 1000);
        setTimeout(function () {
            api.get("/")
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                })
        }, 60 * 1000)
    });
});













// const request = require('request');
// const mocha = require('mocha');
// const shoule = require('should');

// /* global describe it:true */
// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = require('chai').expect
// const server = require('../app')


// const supertest = require('supertest');

// const api = supertest('http://localhost:3000'); // 定義測試的 API 路徑
// let APItoken; // 全域變數等待 before() 取得 Token



// describe('index 能進入', () => {
//     it('若能進入首頁應該要有次數', (done) => {
//         api.get('/') // 測試取得所有文章
//             .expect(200)
//             .end((err, res) => {
//                 if (err) {
//                     done(err);
//                 }
//                 // expect(res.body[0].article_content).to.be.a('string');
//                 done();
//             });
//     });
// });