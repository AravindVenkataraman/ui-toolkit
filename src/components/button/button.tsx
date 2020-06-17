import {
    Component,
    Element,
    Prop, Host,
    State,
    h
} from "@stencil/core";

@Component({
    tag: 'cvs-button',
    styleUrl: 'button.scss',
    shadow: true
})
export class ButtonComponent {

    @Prop() type: 'basic' | 'raised' | 'outline' | 'flat' = 'basic';
    @Prop() color: 'plain' | 'primary' | 'secondary' | 'danger' = 'plain';
    @Prop({reflect: true}) theme: 'light' | 'dark' = 'light';

    /**
     * if toggle (role is generedated in HTML) else use type passed and append type='{buttonType}' to button
     */
    @Prop() buttonType: 'button' | 'reset' | 'submit' | 'toggle' = 'button';
    /**
     * gives accessible name, will override button text, do not use in conjunction with `aria-labelledby` 
     */
    @Prop() ariaLabel: '' = null;
    /**
     * one or more element `id`(s), that hold label text, will override button text, do not use in conjunction with `aria-label`
     */
    @Prop() ariaLabelledBy: '' = null;
    /**
     * single element `id` of the element containing description text
     */
    @Prop() ariaDescribedBy: '' = null;
    /**
     * set to `true` if the button is disabled
     */
    @Prop() ariaDisabled: true | false = false;
    /**
     * only used for toggle buttons, used to indicate if button is pressed or not, 'mixed' is not supported
     */
    @Prop() ariaPressed: true | false = false;
    /**
     * indicate if expandable content is expanded or not
     */
    @Prop() ariaExpanded: true | false = false;
    /**
     * single element `id` of the container the button expands and collapses, use with `aria-expanded`
     */
    @Prop() ariaControls: '' = null;

    @State() ripples: JSX.Element[] = [];
    @State() attributes = {};

    @Element() buttonEl: HTMLElement;


    handleClick = (event) => {
        let {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.buttonEl;

        let rippleSize;
        if (offsetWidth > offsetHeight) {
            rippleSize = offsetWidth;
        } else {
            rippleSize = offsetHeight;
        }

        const rippleX = event.pageX - offsetLeft - rippleSize / 2;
        const rippleY = event.pageY - offsetTop - rippleSize / 2;

        const rippleStyles = {
            width: rippleSize + 'px',
            height: rippleSize + 'px',
            top: rippleY + 'px',
            left: rippleX + 'px'
        };

        this.ripples = [...this.ripples, (<span class="ripple" style={rippleStyles}/>)];

        if(this.buttonType === 'toggle') {
            this.ariaPressed = !this.ariaPressed;
            this.attributes['aria-pressed'] = this.ariaPressed;
        }
    }

    render() {
        if(this.buttonType === 'toggle') {
            this.attributes['role'] = 'button';
        }
        else {
            this.attributes['type'] = this.buttonType;
        }

        if(this.ariaLabel) {
            this.attributes['aria-label'] = this.ariaLabel;
        }
        if(this.ariaLabelledBy){
            this.attributes['aria-labelledBy'] = this.ariaLabelledBy;
        }
        if(this.ariaDescribedBy) {
            this.attributes['aria-describedBy'] = this.ariaDescribedBy;
        }
        if(this.ariaDisabled) {
            this.attributes['aria-disabled'] = this.ariaDisabled;
            this.attributes['disabled'] = this.ariaDisabled;
        }
        if(this.ariaPressed || this.buttonType === 'toggle') { //toggle button requires a default state
            this.attributes['aria-pressed'] = this.ariaPressed;
        }
        if(this.ariaExpanded) {
            this.attributes['aria-expanded'] = this.ariaExpanded;
        }
        if(this.ariaControls) {
            this.attributes['aria-controls'] = this.ariaControls;
        }
        
        return (
            <Host>
                <button {...this.attributes} class={`${this.type} ${this.color}`} onClick={this.handleClick}>
                    {...this.ripples}
                    <slot/>
                </button>
            </Host>
        );
    }
}
