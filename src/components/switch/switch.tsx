import {Component, Prop, h, EventEmitter, Event} from "@stencil/core";

@Component({
    tag: 'cvs-switch',
    styleUrl: 'switch.scss'
})
export class SwitchComponent {

    @Prop() title: string = 'title here';

    @Event({
        eventName: 'toggle'
    }) toggle: EventEmitter<boolean>;

    ontoggle() {
        const toggleSwitch: any = document.querySelector('.theme-switch input[type="checkbox"]');
        this.toggle.emit(toggleSwitch.checked);
    }

    render() {
        return (
            <div class="theme-switch-wrapper">
                <label class="theme-switch">
                    <input type="checkbox" id="checkbox" onClick={this.ontoggle.bind(this)}/>
                    <div class="slider round"></div>
                </label>
                <em>{this.title}</em>
            </div>
        );
    }
}
