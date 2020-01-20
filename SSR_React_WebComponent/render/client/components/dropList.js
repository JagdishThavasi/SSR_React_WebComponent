const sheet = new CSSStyleSheet();
sheet.replaceSync('.dropbtn{background-color:#fff;color:#0f8ec7;padding:16px;font-size:1.2em;border:none;cursor:pointer;border-radius:5px}.dropdown{position:relative;display:inline-block}.dropdown-content{display:none;position:absolute;background-color:#f9f9f9;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);z-index:1;border-radius:5px;left:-25px}.dropdown-content a{color:#0f8ec7;padding:12px 16px;min-width:100px;text-decoration:none;display:block}.dropdown-content span{color:#000;padding:12px 16px;min-width:100px;text-decoration:none;display:block}.dropdown-content a:hover{background-color:#efefef}.dropdown:hover .dropdown-content{display:block}.dropdown:hover .dropbtn{background-color:#efefef}');

export default class dropList extends HTMLElement{
  constructor() {
    super()
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.initialselectedNumber = false
    this.initialfrequency = false
  }

  static get observedAttributes() {
    return ['selectednumber', 'frequency'];
  }

  connectedCallback(){
    this.dropDownList = ''
    this._renderDropDown()
  }

  attributeChangedCallback(name, oldValue, newValue){
    if(this.hasAttribute('selectednumber') && name === 'selectednumber' && oldValue != newValue && this.initialselectedNumber === true){
        this._rerender()
    }else{
        this.initialselectedNumber = true
    }
    if(this.hasAttribute('frequency') && name === 'frequency' && oldValue != newValue && this.initialfrequency === true){
        this._rerender()
    }else{
        this.initialfrequency = true
    }
  }

  _rerender(){
    this.dropDownList = ''
    this.shadowRoot.innerHTML = ''
    this._renderDropDown()
  }

  _renderDropDown(){
    let i = 0
    const showPage = this.hasAttribute('showPage')
    const frequency = Number(this.getAttribute('frequency'))
    const total = Number(this.getAttribute('total'))
    const selectedNumber = Number(this.getAttribute('selectedNumber'))
    while(i < total){
      this.dropDownList += (i === selectedNumber ?  (showPage ? `<span>${i} - ${i+frequency}</span>` : `<span>${i}</span>`) : (showPage ? `<a href="#" data-pageNumber=${i}>${i} - ${i+frequency}</a>` : `<a href="#" data-recordNumber=${i}>${i}</a>`))
      i += Number(this.getAttribute('frequency'))
    }
    this.render()
    this.shadowRoot.querySelectorAll('.dropdown .dropdown-content a[data-pageNumber]').forEach((item) => item.addEventListener('click', this._emitPageNumber.bind(this)))
    this.shadowRoot.querySelectorAll('.dropdown .dropdown-content a[data-recordNumber]').forEach((item) => item.addEventListener('click', this._emitRecordNumber.bind(this)))
  }

  _emitPageNumber(event){
    this.pageNumber = event.target.getAttribute('data-pageNumber')
    const changeEvent = new Event('pageChange', { bubbles: true, composed: true })
    event.target.dispatchEvent(changeEvent)
  }

  _emitRecordNumber(event){
    this.recordNumber = event.target.getAttribute('data-recordNumber')
    const changeEvent = new Event('recordChange', { bubbles: true, composed: true })
    event.target.dispatchEvent(changeEvent)
  }

  render(){
    this.shadowRoot.innerHTML = `
            <div class="dropdown">
              <button class="dropbtn">${this.getAttribute('name')}</button>
              <div class="dropdown-content">
                ${this.dropDownList}
              </div>
            </div>
      `
  }
}
customElements.define('drop-list', dropList);
