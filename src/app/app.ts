import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { Login } from "./auth/login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'smart-shipping';
}
