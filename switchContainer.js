var Gaffa = require('gaffa'),
    statham = require('statham'),
    crel = require('crel');

function SwitchContainer(){}
SwitchContainer = Gaffa.createSpec(SwitchContainer, Gaffa.ContainerView);
SwitchContainer.prototype._type = 'switchContainer';

SwitchContainer.prototype.render = function(){
    var renderedElement = crel(this.tagName || 'div');

    this.views.content.element = renderedElement;
    this.renderedElement = renderedElement;
};

function createNewView(property, template, templateKey){
    var view = statham.revive(template);

    return property.gaffa.initialiseViewItem(view, property.gaffa, property.gaffa.views._constructors);
}

SwitchContainer.prototype.content = new Gaffa.Property(function(viewModel, value){
    var template,
        content = viewModel.views.content;

    // remove old view
    if(this._templatedView){
        this._templatedView.remove();
    }

    if(!value && this.emptyTemplate){
        content.add(createNewView(this, this.emptyTemplate, 'emptyTemplate'));
        return;
    }

    template = this.templates && this.templates[value] || this.emptyTemplate;

    if(!template){
        return;
    }

    this._templatedView = createNewView(this, template, 'templates-' + value);

    content.add(this._templatedView);
});

module.exports = SwitchContainer;