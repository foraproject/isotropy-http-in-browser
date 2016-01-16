import __polyfill from "babel-polyfill";
import should from "should";

import lib from "../isotropy-request-response-in-browser";

describe("Isotropy Request", () => {
    it("Must be created", () => {
        const req = new lib.Request({ host: "www.example.com", method: "GET" });
        req.host.should.equal("www.example.com");
        req.method.should.equal("GET");
    });

    it("Must trigger an event", () => {
        const req = new lib.Request({ host: "www.example.com", method: "GET" });
        return new Promise((resolve, reject) => {
            req.on("someevent", function() {
                resolve();
            })
            req.emit("someevent");
        });
    });
});

describe("Isotropy Response", () => {
    it("Must be created", () => {
        const resp = new lib.Response({ body: "hello world" });
        resp.body.should.equal("hello world");
    });

    it("Must set the header", () => {
        const resp = new lib.Response({ body: "hello world" });
        resp.setHeader("Cache-Control", "max-age=3600");
        resp._headers["Cache-Control"].should.equal("max-age=3600");
    });

    it("Must delete the header", () => {
        const resp = new lib.Response({ body: "hello world" });
        resp.setHeader("Cache-Control", "max-age=3600");
        resp.removeHeader("Cache-Control");
        should.not.exist(resp._headers["Cache-Control"]);
    });

    it("Must trigger an event", () => {
        const resp = new lib.Response({ body: "hello world" });
        return new Promise((resolve, reject) => {
            resp.on("someevent", function() {
                resolve();
            })
            resp.emit("someevent");
        });
    });

    it("Must trigger end", () => {
        const resp = new lib.Response({ body: "hello world" });
        return new Promise((resolve, reject) => {
            resp.on("end", function() {
                resp.finished.should.be.true();
                resolve();
            })
            resp.end();
        });
    });

});
