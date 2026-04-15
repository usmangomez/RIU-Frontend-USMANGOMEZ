import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-main',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
