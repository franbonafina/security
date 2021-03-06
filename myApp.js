const express = require('express'); 
const app = express();            
const helmet = require('helmet')
const api = require('./server.js');

app.disable('strict-transport-security');
app.use(express.static('public'));
app.use('/_api', api);
app.use(helmet());

// Helmet
helmet.hidePoweredBy();
helmet.frameguard({action: 'DENY'});
helmet.xssFilter();
helmet.noSniff();
helmet.ieNoOpen();
helmet.hsts();




/**  7) Ask browsers to access your site via HTTPS only - `helmet.hsts()` */

// HTTP Strict Transport Security (HSTS) is a web security policy mechanism which 
// helps to protect websites against protocol downgrade attacks and cookie hijacking.
// If your website can be accessed via HTTPS you can ask user's browsers
// to avoid using insecure HTTP. Setting the header `Strict-Transport-Security`
// instructs browsers to use HTTPS for all the future requests occurring in a
// specified amount of time. This will work for the requests coming **after**
// the initial request.

// Configure `helmet.hsts()` to instruct browsers to use HTTPS for the next
// **90 days**, passing the config object {maxAge: timeInSeconds}. 
// HyperDev already has **hsts** enabled, to override its settings you need to 
// set the field `force` to `true` in the config object. To not alter hyperdev security 
// policy we will intercept and restore the header, after inspecting it for testing.

var ninetyDaysInSeconds = 90*24*60*60;


//**Note**:
// Configuring HTTPS on a custom website requires the acquisition of a domain,
// and a SSL/TLS Certificate.

/** 8) Disable DNS Prefetching - `helmet.dnsPrefetchControl()` */

// To improve performance, most browsers prefetch DNS records for the links in
// a page. In that way the destination ip is already known when the user clicks on a link.
// This may lead to over-use of the DNS service (if you own a big website,
// visited by millions people...), privacy issues (one eavesdropper could infer
// that you are on a certain page - even if encrypted -, from the links you are
// prefecthing), or page statistics alteration (some links may appear visited
// even if they are not). If you have high security needs you can disable
// DNS prefetching, at the cost of a performance penalty.

// Use `helmet.dnsPrefetchControl()`



/** 9) Disable Client-Side Caching - `helmet.noCache()` */

// If you are releasing an update for your website, and you want your users
// to download the newer, more performant and safer version, you can (try to)
// disable caching on client's browser, for your website. It can be useful
// in development too. Caching has performance benefits, and you will lose them,
// use this option only when there is a real need.

// Use helmet.noCache()



/** 10) Content Security Policy - `helmet.contentSecurityPolicy()` */

// This challenge highlights one promising new defense that can significantly reduce
// the risk and impact of many type of attacks in modern browsers. By setting and
// configuring a Content Security Policy you can prevent the injection of anything
// unintended  into your page. This will protect your app from XSS vulnerabilities,
// undesidered tracking, malicious frames, and much more.
// CSP works by defining  a whitelist of content sources which are trusted, for
// each kind of resource a web page may need to load (scripts, stylesheets,
// fonts, frames,media,  and so on...). There are multiple directives available,
// so a website owner can have a granular control.
// See http://www.html5rocks.com/en/tutorials/security/content-security-policy/ ,
// https://www.keycdn.com/support/content-security-policy/ for more details.
// Unfortunately CSP in unsupported by older browser.
//
// By default, directives are wide open, so it's important to set the `defaultSrc`
// directive (helmet supports both `defaultSrc` and `default-src` naming styles),
// as a fallback for most of the other unspecified directives.
// In this exercise, use `helmet.contentSecurityPolicy()`, and configure it
// setting the `defaultSrc` directive to `["'self'"]` (the list of allowed sources
// must be in an array), in order to trust **only your website address** by default.
// Set also the `scriptSrc` directive so that you will allow scripts to be downloaded
// from your website, and from the domain `trusted-cdn.com`.
//
// **Hint**: 
// in the `"'self'"` keyword, the single quotes are part of the keyword itself, 
// so it needs to be enclosed in **double quotes** to be working.



/** TIP: */ 

// `app.use(helmet())` will automatically include all the middleware
// presented above, except `noCache()`, and `contentSecurityPolicy()`,
// but these can be enabled if necessary. You can also disable or 
// set any other middleware individually, using a configuration object.

// // - Example - 
// app.use(helmet({
//   frameguard: {              // configure
//     action: 'deny'
//   },
//   contentSecurityPolicy: {   // enable and configure
//    directives: {
//      defaultSrc: ["'self'"],
//      styleSrc: ['style.com'],
//    }
//   },
//  dnsPrefetchControl: false   // disable
// }))

// We introduced each middleware separately, for teaching purpose, and for
// ease of testing. Using the 'parent' `helmet()` middleware is easiest, and
// cleaner, for a real project.

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


module.exports = app;
