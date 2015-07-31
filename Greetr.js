(function (global, $) {

    //  return 'new Object'
    var Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };

    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es'];

    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Halo'
    };

    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Logged in (spanish)'
    };

    // prototype holds the methods (to save memory space)
    Greetr.prototype = {

        // 'this' refers to the calling object at the time of excecution
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function () {
            // check this is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        // retrieve messages from object by referring to properties using [] syntax
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        greet: function (formal) {
            var msg;

            // either 'undefined' or 'null' will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at the time of excecution
            // makes the method chainable
            return this;
        },

        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            // make chainable
            return this;
        },

        setLang: function (lang) {
            // set the language
            this.language = lang;

            // validate
            this.validate();

            // make chainable
            return this;
        },

        HTMLGreeting: function (selector, formal) {
            var self = this;

            if (!$) {
                throw 'jQuery is not loaded';
            }

            if (!selector) {
                throw 'Selector is missing';
            }
            
            // determine the message
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            // inject the message in the chosen selector in the DOM
            $(selector).html(msg);

            // make chainable
            return this;
        }
    };

    // The actual object is created here, allowing us to do 'new Object' without even calling 'new'
    Greetr.init = function (firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    };

    // trick borrowed from jQuery, so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand 'G$'
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));