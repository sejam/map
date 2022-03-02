(function () {
    var gPassedAPIkey;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
          fieldset {
              margin-bottom: 10px;
              border: 1px solid #afafaf;
              border-radius: 3px;
          }
          table {
              width: 100%;
          }
          input, textarea, select {
              font-family: "72",Arial,Helvetica,sans-serif;
              width: 100%;
              padding: 4px;
              box-sizing: border-box;
              border: 1px solid #bfbfbf;
          }
          input[type=checkbox] {
              width: inherit;
              margin: 6px 3px 6px 0;
              vertical-align: middle;
          }
          
      </style>
      <link rel="stylesheet" href="https://js.arcgis.com/4.22/esri/themes/light/main.css">
    <script src="https://js.arcgis.com/4.22/"></script>
    
      <script>
      require(["esri/config","esri/Map", "esri/views/MapView"], function (esriConfig,Map, MapView) {
        esriConfig.apiKey = "AAPK278d62b8066740a7acd1dba583248937wv4oooCSLUilUhrZXYAGlOjd2N2UJxNR7G1HOHrEKnTFx5y81L-MBQZh65BQEOY_";

        const map = new Map({
          basemap: "arcgis-topographic" // Basemap layer service
      });
      const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
      });
      });
      </script>
      
      <form id="form" autocomplete="off">
        <fieldset> 
          <legend>GIS Widget Properties</legend>
          <table>
            <tr>
              <td><label for="apikey">API Key:</label></td>
              <td><input id="apikey" name="apikey" type="text"></td>
            </tr>
            <tr>
              <td><label for="portalurl">URL:</label></td>
              <td><input id="portalurl" name="portalurl" type="text"></td>
            </tr>
            
          </table>
        </fieldset>
        <button type="submit" hidden>Submit</button>
      </form>
    `;

    class restAPIAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            let form = this._shadowRoot.getElementById("form");
            form.addEventListener("submit", this._submit.bind(this));
            form.addEventListener("change", this._change.bind(this));
        }

        connectedCallback() {
        }

        _submit(e) {
            e.preventDefault();
            let properties = {};
            for (let name of restAPIAps.observedAttributes) {
                properties[name] = this[name];
            }
            console.log(properties);
            this._firePropertiesChanged(properties);
            return false;
        }
        _change(e) {
            this._changeProperty(e.target.name);
        }
        _changeProperty(name) {
            let properties = {};
            properties[name] = this[name];
            this._firePropertiesChanged(properties);
        }

        _firePropertiesChanged(properties) {
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: properties
                }
            }));
        }

        get apikey() {
            return this.getValue("apikey");
            
        }
        set apikey(value) {
            this.setValue("apikey", value);
            
        }

        get portalurl() {
            return this.getValue("portalurl");
        }
        set portalurl(value) {
            this.setValue("portalurl", value);
        
            
        } 
        

        getValue(id) {
            return this._shadowRoot.getElementById(id).value;
        }
        setValue(id, value) {
          console.log(id +":" + value);
            this._shadowRoot.getElementById(id).value = value;
        }

        static get observedAttributes() {
            return [
                "apikey",
                "portalurl"
            ];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }
    }
    customElements.define("com-sap-custom-geomap-aps", restAPIAps);
})();
