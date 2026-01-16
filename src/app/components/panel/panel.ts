import { Component } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../../services/products/products';
import { Router } from '@angular/router';


@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {

  data: any[] = [];
  constructor(private router: Router, private productService: Products) { }

  ngOnInit() {
    this.productService.getData().subscribe(csv => {
      this.data = this.productService.csvToJson(csv);
      console.log(this.data);
    });
  }

}

