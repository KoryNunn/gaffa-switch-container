var Gaffa = require('gaffa'),
    SwitchContainer = require('../'),
    Text = require('gaffa-text'),
    Textbox = require('gaffa-textbox'),
    Button = require('gaffa-button'),
    Toggle = require('gaffa-toggle'),
    gaffa = new Gaffa();

// Register used viewItems with gaffa
gaffa.registerConstructor(SwitchContainer);
gaffa.registerConstructor(Text);
gaffa.registerConstructor(Textbox);
gaffa.registerConstructor(Button);

var text = new Text();
text.text.binding = '[value]';

var textbox = new Textbox();
textbox.value.binding = '[value]';

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
})

// Add the view on load.
window.onload = function(){
    gaffa.views.add([
        switchContainer,
        button
    ]);
};

// Globalise gaffa for easy debugging.
window.gaffa = gaffa;