class AnimatedCard {
    constructor(config) {
        this.cards = document.querySelectorAll('.' + config.cards);
        this.config = config;
        this.addListeners();
    }

    addListeners() {
        this.cards.forEach((card) => {
            card.addEventListener('mouseenter', (e) => {
                this.runAnimation(e.target, e);
            });

            card.addEventListener('mouseleave', (e) => {
                this.runAnimation(e.target, e);
            });
        });
    }

    runAnimation(element, event) {
        let isCard = element.classList.contains(this.config.cards);
        if (isCard) {
            let cardLayer = element.querySelector(this.config.layer);
            let side = this.findSide(element, event.x, event.y);
            let className = '';
            switch (side) {
                case 'top':
                    className = this.getPrefix() + this.config.suffixes.top;
                    break;
                case 'bottom':
                    className = this.getPrefix() + this.config.suffixes.bottom;
                    break;
                case 'left':
                    className = this.getPrefix() + this.config.suffixes.left;
                    break;
                case 'right':
                    className = this.getPrefix() + this.config.suffixes.right;
            }
            this.config.animations.forEach((className) => {
                cardLayer.classList.remove(className);
            });
            cardLayer.classList.add(className);
        }
    }

    getPrefix(eventType) {
        return event.type === 'mouseenter'? 'enter' : 'leave';
    }

    findSide(card, mouseX, mouseY) {
        let cardBounding = card.getBoundingClientRect();

        let elLeftEdge = cardBounding.left;
        let elTopEdge = cardBounding.top;
        let elRightEdge = cardBounding.right;
        let elBottomEdge = cardBounding.bottom;

        let diffTopEdgeAndMouseY = Math.abs(elTopEdge - mouseY);
        let diffBottomEdgeAndMouseY = Math.abs(elBottomEdge - mouseY);
        let diffLeftEdgeAndMouseX = Math.abs(elLeftEdge - mouseX);
        let diffRightEdgeAndMouseX = Math.abs(elRightEdge - mouseX);

        let min = Math.min(diffTopEdgeAndMouseY, diffBottomEdgeAndMouseY, diffLeftEdgeAndMouseX, diffRightEdgeAndMouseX);

        switch(min) {
            case diffTopEdgeAndMouseY:
                return 'top';
            case diffBottomEdgeAndMouseY:
                return 'bottom';
            case diffLeftEdgeAndMouseX:
                return 'left';
            case diffRightEdgeAndMouseX:
                return 'right';
        }
    }
}

new AnimatedCard({
    cards: 'card',
    layer: '.card__layer',
    animations: [
        'enter-top', 'enter-bottom', 'enter-left', 'enter-right', 'leave-top', 'leave-bottom', 'leave-left', 'leave-right'
    ],
    suffixes: {
        top: '-top',
        bottom: '-bottom',
        left: '-left',
        right: '-right',
    }
});