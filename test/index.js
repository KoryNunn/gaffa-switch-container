var Gaffa = require('gaffa'),
    SwitchContainer = require('../'),
    Text = require('gaffa-text'),
    GaffaSet = require('gaffa-set'),
    Label = require('gaffa-label'),
    Textbox = require('gaffa-textbox'),
    Button = require('gaffa-button'),
    Toggle = require('gaffa-toggle'),
    gaffa = new Gaffa();

// Register used viewItems with gaffa
gaffa.registerConstructor(SwitchContainer);
gaffa.registerConstructor(Text);
gaffa.registerConstructor(Textbox);
gaffa.registerConstructor(Button);

var set = new GaffaSet();
set.source.value = 'Hello';
set.target.binding = '[label]';

var label = new Label();
label.text.binding = '[label]';

var text = new Text();
text.text.binding = '[value]';

var textbox = new Textbox();
textbox.value.binding = '[value]';
textbox.actions.load = [set];


// create a switchContainer to test with
var switchContainer = new SwitchContainer();
switchContainer.content.binding = '(? [edit] "edit" "view")';
switchContainer.content.templates = {
    'edit': textbox,
    'view': text
};

var toggleEdit = new Toggle();
toggleEdit.target.binding = '[edit]';

var button = new Button();
button.text.value = 'Toggle edit';
button.actions.click = [toggleEdit];

// An example model
gaffa.model.set({
    value:'Hello world'
});

// Add the view on load.
window.onload = function(){
    gaffa.views.add([
        switchContainer,
        label,
        button
    ]);
};

// Globalise gaffa for easy debugging.
window.gaffa = gaffa;