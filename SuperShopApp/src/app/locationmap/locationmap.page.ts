import { Component, OnInit , OnDestroy} from '@angular/core';
import * as Leaflet from 'leaflet';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-locationmap',
  templateUrl: './locationmap.page.html',
  styleUrls: ['./locationmap.page.scss'],
})
export class LocationmapPage implements OnInit {

  map: Leaflet.Map;
  latitude = 17.996257000000004;
  longitude = 102.57402250000001;
  constructor( public loadingCtrl:LoadingController ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.map.remove();
  }
  ionViewDidEnter() { 
    
    this.leafletMap(); 
  
  }

  async  leafletMap() {

    const loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    
     });
     await loader.present()
     try {
      this.map = Leaflet.map('mapId').setView([this.latitude,this.longitude], 1);
     } catch (error) {
       
     }
  
     
          
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'edupala.com © Angular LeafLet',
  
      }).addTo(this.map);
  
      const driverMarkerIcon = Leaflet.icon({
        iconUrl: '../../assets/imgs/delivery_car.png',
        iconSize: [15, 25], 
        popupAnchor: [0, -20],
      });
      const popDriver='<p> Delivery </p>';
  
      const customMarkerIcon = Leaflet.icon({
        iconUrl: '../../assets/imgs/custom-marker-icon.png',
        iconSize: [25, 25], 
        popupAnchor: [0, -20],
      });
      const popcustom='<p> Customer </p>';
  
      const shopMarkerIcon = Leaflet.icon({
        iconUrl: '../../assets/imgs/shop.png',
        iconSize: [30, 30], 
        popupAnchor: [0, -20],
      });
      const popshop='<p> Shop  </p>';
  
     
      let driver = Leaflet.marker([17.989794924880556,102.58981704711914],{icon:driverMarkerIcon})
      //.addTo(this.map)
      .bindPopup(popDriver).openPopup();
  
      let shop = Leaflet.marker([17.980651617488846,102.58501052856447],{icon:shopMarkerIcon})
      //.addTo(this.map)
      .bindPopup(popshop).openPopup();
  
      // console.log('distance',this.distance(driver.getLatLng().lat,driver.getLatLng().lng,shop.getLatLng().lat,shop.getLatLng().lng,'km'));
      
      
      let customer = Leaflet.marker([this.latitude,this.longitude],{icon:customMarkerIcon})
      //.addTo(this.map)
      .bindPopup(popcustom).openPopup();
      let latlngs = [ [38.91,-77.07], [37.77, -79.43], [39.04, -85.2]] as Leaflet.LatLngExpression[];
      let polyline = Leaflet.polyline(latlngs, {color: 'red'});
      polyline.addTo(this.map);
      let marks=[driver,shop,customer];
      let group = Leaflet.featureGroup(marks).addTo(this.map);
      this.map.fitBounds(group.getBounds());//works!
      
  
  
  
  
      loader.dismiss();
  
  
  }
}
