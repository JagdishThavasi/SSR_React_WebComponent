
class LoadDropDown extends HTMLElement {
  connectedCallback(){
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<span>Hello, <slot></slot>!</span>';
  }
}
customElements.define('load-dropdown', LoadDropDown);
