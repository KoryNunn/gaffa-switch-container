gaffa-switch-container
============

switch container view for gaffa

Rendere different templates based on the result of an expression.

## Install:

    npm i gaffa-switch-container

## Add to gaffa:

    var SwitchContainer = require('gaffa-switch-container');

    gaffa.registerCnstructor(SwitchContainer);

## Usage

    var switchContainer = new SwitchContainer();

    // Add to gaffa...

# API

## Properties (instanceof Gaffa.Property)

### content

What content to render

eg:

    switchContainer.content.binding = '(? a "view1" "view2")';
    switchContainer.content.templates = {
        "view1": someGaffaView,
        "view2": anotherGaffaView
    };

You can also provide a template for if no templates match:

    switchContainer.content.emptyTemplate = viewForEmpty