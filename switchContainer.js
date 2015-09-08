var Gaffa = require('gaffa'),
    crel = require('crel'),
    statham = require('statham');

function SwitchContainer(){}
SwitchContainer = Gaffa.createSpec(SwitchContainer, Gaffa.ContainerView);
SwitchContainer.prototype._type = 'switchContainer';

SwitchContainer.prototype.render = function(){
    var renderedElement = crel(this.tagName || 'div');

    this.views.content.element = renderedElement;
    this.renderedElement = renderedElement;
};

SwitchContainer.prototype.content = new Gaffa.Property(function(viewModel, value){
    var template,
        content = viewModel.views.content;

    this._templates = this._templates || {};

    // remove old view
    if(this._templatedView){
        this._templatedView.remove();
    }

    if(!value || !this.templates || !this.templates[value]){
        if(!this.emptyTemplate){
            return;
        }

        if(!this._templates.emptyTemplate){
            this._templates.emptyTemplate = statham.stringify(this.emptyTemplate);
        }

        template = this._templates.emptyTemplate;
    } else {
        if(!this._templates[value]){
            this._templates[value] = statham.stringify(this.templates[value]);
        }

        template = this._templates[value];
    }

    this._templatedView = content.add(viewModel.gaffa.initialiseView(statham.parse(template)));
});

module.exports = SwitchContainer;