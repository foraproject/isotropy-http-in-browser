import __polyfill from "babel-polyfill";
import should from "should";

import lib from "../isotropy-http-in-browser";

describe("Isotropy Http", () => {
    it("Must create a Server", () => {
        const server = new lib.createServer(() => {});
        server.should.not.be.empty();
    });
});

describe("Isotropy Server", () => {
    let server;

    afterEach(() => {
        server.close();
    });

    it("Must listen", () => {
        server = new lib.createServer(() => resolve());
        server.listen(80);
        server.port.should.equal(80);
        server.host.should.equal("");
    });

    it("Must listen at host:port", () => {
        server = new lib.createServer(() => resolve());
        server.listen(8080, "www.example.com");
        server.port.should.equal(8080);
        server.host.should.equal("www.example.com");
    });

    it("Must listen at host:port and fire callback", () => {
        server = new lib.createServer(() => resolve());
        return new Promise((resolve, reject) => {
            server.listen(8080, "www.example.com", () => {
                server.port.should.equal(8080);
                server.host.should.equal("www.example.com");
                resolve();
            });
        });
    });

    it("Must get number of connections", () => {
        server = new lib.createServer(() => resolve());
        return new Promise((resolve, reject) => {
            server.listen(8080, "www.example.com", () => {
                server.connections.should.equal(1);
                resolve();
            });
        });
    });

    it("Must get number of connections async", () => {
        server = new lib.createServer(() => resolve());
        return new Promise((resolve, reject) => {
            server.listen(8080, "www.example.com", () => {
                server.getConnections((err, numConnections) => {
                    numConnections.should.equal(1);
                    resolve();
                });
            });
        });
    });
});

describe("Isotropy IncomingMessage", () => {
    it("Must be created", () => {
        const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
        req.host.should.equal("www.example.com");
        req.method.should.equal("GET");
    });

    it("Must trigger an event", () => {
        const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
        return new Promise((resolve, reject) => {
            req.on("someevent", function() {
                resolve();
            })
            req.emit("someevent");
        });
    });

    it("Must set headers", () => {
        const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
        req.headers = { "Accept": "text/plain" };
        req.headers["Accept"].should.equal("text/plain");
    });

    it("Must set raw headers", () => {
        const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
        req.headers = { "Accept": "text/plain", "Accept-Encoding": "gzip, deflate" };
        req.rawHeaders.length.should.equal(4);
        req.rawHeaders[0].should.equal("Accept");
        req.rawHeaders[1].should.equal("text/plain");
    });

    it("Must call cb() on setTimeout", () => {
        const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
        return new Promise((resolve, reject) => {
            req.setTimeout(10, () => {
                resolve();
            });
        });
    });
});

describe("Isotropy ServerResponse", () => {
    it("Must be created", () => {
        const res = new lib.ServerResponse({ body: "hello world" });
        res.body.should.equal("hello world");
    });

    it("Must set the header", () => {
        const res = new lib.ServerResponse({ body: "hello world" });
        res.setHeader("Cache-Control", "max-age=3600");
        res._headers["Cache-Control"].should.equal("max-age=3600");
    });

    it("Must delete the header", () => {
        const res = new lib.ServerResponse({ body: "hello world" });
        res.setHeader("Cache-Control", "max-age=3600");
        res.removeHeader("Cache-Control");
        should.not.exist(res._headers["Cache-Control"]);
    });

    it("Must trigger an event", () => {
        const res = new lib.ServerResponse({ body: "hello world" });
        return new Promise((resolve, reject) => {
            res.on("someevent", function() {
                resolve();
            })
            res.emit("someevent");
        });
    });

    it("Must trigger end", () => {
        const res = new lib.ServerResponse({ body: "hello world" });
        return new Promise((resolve, reject) => {
            res.on("end", function() {
                res.finished.should.be.true();
                resolve();
            });
            res.end();
        });
    });

    it("Must call cb() on setTimeout", () => {
        const res = new lib.ServerResponse({ body: "hello world" });
        return new Promise((resolve, reject) => {
            res.setTimeout(10, () => {
                resolve();
            });
        });
    });

});
