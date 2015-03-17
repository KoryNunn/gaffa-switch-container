var Gaffa = require('gaffa'),
    crel = require('crel');

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

    // remove old view
    if(this._templatedView){
        this._templatedView.remove();
    }

    if(!value || !this.templates || !this.templates[value]){
        if(!this.emptyTemplate){
            return;
        }

        if(!(this.emptyTemplate instanceof Gaffa.View)){
            this.emptyTemplate = viewModel.gaffa.initialiseView(this.emptyTemplate);
        }

        template = this.emptyTemplate;
    } else {
        if(!(this.templates[value] instanceof Gaffa.View)){
            this.templates[value] = viewModel.gaffa.initialiseView(this.templates[value]);
        }

        template = this.templates[value];
    }

    this._templatedView = content.add(template._clone());
});

module.exports = SwitchContainer;