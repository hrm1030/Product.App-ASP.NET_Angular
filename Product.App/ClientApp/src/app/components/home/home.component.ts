import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoadingData: boolean = true;
  price: number = 0;
  products: any = [
    {
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Dog',
      price: 15
    },
    {
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Dog',
      price: 15
    },
    {
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Dog',
      price: 15
    },
    {
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Dog',
      price: 15
    },
    {
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Dog',
      price: 15
    },
    {
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Dog',
      price: 15
    },
    {
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Dog',
      price: 15
    },
    {
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Dog',
      price: 15
    },
  ];

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  ngOnInit() {
    if(this.products.length > 0 ) {
      this.isLoadingData = false;
    }
  }
}
