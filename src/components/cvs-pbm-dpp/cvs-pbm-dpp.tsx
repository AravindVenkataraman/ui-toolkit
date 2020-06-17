import {Component, Prop, h, State, Watch} from '@stencil/core';

@Component({
  tag: 'cvs-pbm-dpp',
  styleUrl: 'cvs-pbm-dpp.css',
  shadow: true
})
export class CvsPbmDpp {
  @State() firstNdcId: string;
  @State() drugName: string;
  @State() descriptionHeader: string;
  @State() description: string;
  @State() ContraindicationsHeader: string;
  @State() Contraindications: string;
  @State() AdministrationHeader: string;
  @State() Administration: string;
  @State() SideEffectsHeader: string;
  @State() SideEffects: string;
  @State() awaitingDrugInfo: boolean = true;
  @State() apiSuccess: boolean = false;
  @State() apiError: boolean = false;

  @Prop() token: string;
  @Prop() language: string;
  @Prop() ndc: string;

  @Watch('ndc')
  parseMyArrayProp(newValue: string) {
    if(newValue.indexOf(",") >= 0){
      if (newValue) this.firstNdcId = (newValue.split(","))[0];
    }else{
      if (newValue) this.firstNdcId = newValue;
    }
  }


  private fetchDrugData(){
    console.log("Token from Host component::"+ this.token);
    this.parseMyArrayProp(this.ndc);
    console.log("Language from Host component::"+ this.language);
    console.log("First item in NDC List from Host component::"+ this.firstNdcId);
    try{
      async function postData(url = '', data) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'omit', // include, *same-origin, omit
          headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/xml',
            'accept': 'application/xml',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: data // body data type must match "Content-Type" header
        });
        return response.text(); // parses JSON response into native JavaScript objects
      }
      let requestData = '<contentPatientEducationRequest><header><serviceContext><appName>CMK_WEB</appName><channelName>WEB</channelName><lineOfBusiness>PBM</lineOfBusiness><deviceID>device12345</deviceID><deviceType>AND_MOBILE</deviceType><deviceToken>device12345</deviceToken><tokenID>'+this.token+'</tokenID><tokenType>PBMMEM</tokenType></serviceContext><securityContext><apiKey>mm56884e-d777-4f52-b9e5-38e49c0b3e72</apiKey></securityContext></header><details><GSMAlchemyRequest><ContentPatientEducationRequest><LanguageCode>en-US</LanguageCode><Identifier><Package><IdentifierType>NDC11</IdentifierType><Identifier>'+this.firstNdcId+'</Identifier></Package></Identifier></ContentPatientEducationRequest><ListProductImagesRequest><AlchemyProductIdFlag>True</AlchemyProductIdFlag></ListProductImagesRequest><ListProductsRequest><Filter><ProductNameFilter></ProductNameFilter></Filter></ListProductsRequest></GSMAlchemyRequest><serviceCORS>TRUE</serviceCORS></details></contentPatientEducationRequest>';

      this.awaitingDrugInfo = true;
      this.apiError = false;
      this.apiSuccess = false;
      postData('https://pbmservices.caremark.com/caremark/GSMAlchemy/contentPatientEducation/1.0', requestData)
        .then(response => {
          this.awaitingDrugInfo = false;
          console.log("Response:"+response);
          let parser = new DOMParser();
          let xmlResponse = parser.parseFromString(response.toString(),"text/xml");
          if(xmlResponse.getElementsByTagName('statusCode')[0].childNodes[0].nodeValue !== "0000"){
            console.log("Error in retrieving drug information");
            this.apiError = true;
          }else{
            this.apiSuccess = true;
            this.drugName = xmlResponse.getElementsByTagName('SheetName')[0].childNodes[0].nodeValue;
            this.descriptionHeader = xmlResponse.getElementsByTagName('DescriptionHeader')[0].childNodes[0].nodeValue;
            this.description = xmlResponse.getElementsByTagName('Description')[0].childNodes[0].nodeValue;
            this.ContraindicationsHeader = xmlResponse.getElementsByTagName('ContraindicationsHeader')[0].childNodes[0].nodeValue;
            this.Contraindications = xmlResponse.getElementsByTagName('Contraindications')[0].childNodes[0].nodeValue;
            this.AdministrationHeader = xmlResponse.getElementsByTagName('AdministrationHeader')[0].childNodes[0].nodeValue;
            this.Administration = xmlResponse.getElementsByTagName('Administration')[0].childNodes[0].nodeValue;
            this.SideEffectsHeader = xmlResponse.getElementsByTagName('SideEffectsHeader')[0].childNodes[0].nodeValue;
            this.SideEffects = xmlResponse.getElementsByTagName('SideEffects')[0].childNodes[0].nodeValue;
          }


        });
    }catch(e){

    }

  }
  componentWillLoad() {
    console.log("Component will load!");
    this.fetchDrugData();
  }

  @Watch('token')
  @Watch('language')
  @Watch('ndc')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The old value of activated is: ', oldValue);
    console.log('The new value of activated is: ', newValue);
    if(newValue) {
      this.fetchDrugData();
    }
  }

  render() {
    return [
            <div>
              <div tabindex="0" class={this.awaitingDrugInfo? 'loading-image' : 'hide'} ></div>
              <div tabindex="0" class={!this.awaitingDrugInfo && this.apiError? 'show' : 'hide'} > Error retrieving drug information.</div>
              <div class={!this.awaitingDrugInfo && this.apiSuccess? 'show' : 'hide'} >
              <div tabindex="0"><b><h3 class="cvs-padding">{this.drugName}</h3></b></div>
              <div tabindex="0" class="cvs-padding">
                <b>{this.descriptionHeader}</b>
              </div>
              <div tabindex="0" class="cvs-padding">
                {this.description}
              </div>
              <div tabindex="0" class="cvs-padding">
                <b>{this.ContraindicationsHeader}</b>
              </div>
              <div tabindex="0" class="cvs-padding">
                {this.Contraindications}
              </div>
              <div tabindex="0" class="cvs-padding">
                <b>{this.AdministrationHeader}</b>
              </div>
              <div tabindex="0" class="cvs-padding">
                {this.Administration}
              </div>
              <div tabindex="0" class="cvs-padding">
                <b>{this.SideEffectsHeader}</b>
              </div>
              <div  tabindex="0" class="cvs-padding">
                {this.SideEffects}
              </div>
              </div>
            </div>
          ];
  }
}
