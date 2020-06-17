
import readme from "./readme.md";

import { storiesOf } from '@storybook/html';

storiesOf('Components|Button', module)
  .addParameters({ jest: ["button"] })
  .addParameters({
    notes: {
      markdown: readme,
    },
  })

  .add('Default', () => {
    return `
    <h3>Basic</h3>
    <div class="align-center">
      <cvs-button>Plain</cvs-button>
      <cvs-button color="primary">Primary</cvs-button>
      <cvs-button color="secondary">Secondary</cvs-button>
      <cvs-button color="danger">Danger</cvs-button>  
    </div>
    `;
  })
  .add('Raised', () => {
    return `
      <h3>Raised</h3>
      <div class="align-center">
        <cvs-button type="raised">Plain</cvs-button>
        <cvs-button type="raised" color="primary">Primary</cvs-button>
        <cvs-button type="raised" color="secondary">Secondary</cvs-button>
        <cvs-button type="raised" color="danger">Danger</cvs-button>   
      </div>       
    `;
  })
  .add('Outline', () => {
    return `
      <h3>Outline</h3>
      <div class="align-center">
        <cvs-button type="outline">Plain</cvs-button>
        <cvs-button type="outline" color="primary">Primary</cvs-button>
        <cvs-button type="outline" color="secondary">Secondary</cvs-button>
        <cvs-button type="outline" color="danger">Danger</cvs-button> 
      </div>         
    `;
  })
  .add('flat', () => {
    return `
      <h3>Flat</h3>
      <div class="align-center">
        <cvs-button type="flat">Plain</cvs-button>
        <cvs-button type="flat" color="primary">Primary</cvs-button>
        <cvs-button type="flat" color="secondary">Secondary</cvs-button>
        <cvs-button type="flat" color="danger">Danger</cvs-button>          
      </div>
    `;
  })